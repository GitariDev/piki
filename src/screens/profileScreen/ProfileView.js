import React from 'react';
import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
  View,
  KeyboardAvoidingView,
  Animated,
  NativeModules,
  Platform,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Body, Title, Toast, Spinner } from 'native-base';
import Expo from 'expo';
import * as actions from '../../actions';
import ProfileImage from './ProfileImage';
import ProfileInputs from './ProfileInputs';
import Axios from 'axios';

class ProfileView extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    name: '',
    location: '',
    company: '',
    position: '',
    email: '',
    number: '',
    address: '',
    saveLoading: false,
    loading: false,
    uploadImage: null,
    profileImage: '',
    fadeAnim: new Animated.Value(0),
    y: new Animated.Value(150)
  };

  _slideAnim() {
    Animated.spring(this.state.y, {
      toValue: 0,
      duration: 800
    }).start(); // Starts the animation

    Animated.spring(this.state.fadeAnim, {
      toValue: 1,
      duration: 800
    }).start();
  }
  //call if error
  _showErrorMessage = context => {
    Toast.show({
      text: context,
      buttonText: 'Okay',
      type: 'danger',
      duration: 3000
    });
  };
  //call if success
  _showSuccessMessage = context => {
    Toast.show({
      text: context,
      buttonText: 'Okay',
      type: 'success',
      duration: 3000
    });
  };
  _loadProfilePhoto = async () => {
    const refresh = await this.setState({ profileImage: '' });
    const token = await AsyncStorage.getItem('authToken');
    const photo = await Axios.get(`${this.props.api}/api/get_profile_image`, {
      headers: { authorization: token }
    });

    this.setState({ profileImage: photo.data.url });
  };
  componentWillMount = async () => {
    const setLoadingState = await this.setState({ loading: true });

    //load business card from storage
    AsyncStorage.multiGet(
      ['bcName', 'bcCompany', 'bcPosition', 'bcEmail', 'bcNumber', 'bcAddress'],
      async (err, stores) => {
        if (
          err ||
          stores[1][1] === null ||
          stores[1][1] === '' ||
          stores[1][1] === undefined
        ) {
          const token = await AsyncStorage.getItem('authToken');
          const loadBusinessCardFromServer = await Axios.get(
            `${this.props.api}/api/my_business_card`,
            { headers: { authorization: token } }
          )
            .then(async res => {
              const businessCard = res.data.businessCard;
              //if succesful set it to state and save to storage
              const setState = await this.setState({
                name: businessCard.name,
                company: businessCard.company,
                position: businessCard.position,
                email: businessCard.email,
                number: businessCard.number,
                address: businessCard.address
              });
              this._loadProfilePhoto();
              const saveToStorage = await AsyncStorage.multiSet(
                [
                  ['bcName', this.state.name],
                  ['bcCompany', this.state.company],
                  ['bcPosition', this.state.position],
                  ['bcEmail', this.state.email],
                  ['bcNumber', this.state.number],
                  ['bcAddress', this.state.address]
                ],
                err => {
                  if (err) {
                    this._showErrorMessage('Sorry. Something went wrong');
                    this.setState({ loading: false });
                    this._slideAnim();
                  }
                  this._showSuccessMessage('Loaded your business card');
                  this.setState({ loading: false });
                  this._slideAnim();
                }
              );
            })
            .catch(err => {
              this._showErrorMessage('Sorry. Something went wrong');
            });
        } else {
          let name = stores[0][1];
          let company = stores[1][1];
          let position = stores[2][1];
          let email = stores[3][1];
          let number = stores[4][1];
          let address = stores[5][1];
          this._loadProfilePhoto();
          this.setState({
            name: name,
            company: company,
            position: position,
            email: email,
            number: number,
            address: address,
            loading: false
          });
          this._slideAnim();
        }
      }
    );
  };

  _onChangeText = (text, input) => {
    this.setState({ [input]: text });
  };

  _saveBusinessCard = async () => {
    LayoutAnimation.spring();
    this.setState({ saveLoading: true });
    AsyncStorage.multiSet(
      [
        ['bcName', this.state.name],
        ['bcCompany', this.state.company],
        ['bcPosition', this.state.position],
        ['bcEmail', this.state.email],
        ['bcNumber', this.state.number],
        ['bcAddress', this.state.address]
      ],
      async err => {
        if (err) {
          this._showErrorMessage('Sorry. Something went wrong');
          this.setState({ saveLoading: false });
        }

        const token = await AsyncStorage.getItem('authToken');

        const businessCard = this.state;

        const serverSave = await Axios.post(
          `${this.props.api}/api/save_business_card`,
          { businessCard },
          {
            headers: { authorization: token }
          }
        )
          .then(async () => {
            LayoutAnimation.spring();
            this._showSuccessMessage('Save Successful');
            this.setState({ saveLoading: false });
          })
          .catch(err => {
            this._showErrorMessage('something went wrong');
            LayoutAnimation.spring();
            this.setState({ saveLoading: false });
          });
      }
    );
  };
  _changeProfilePhoto = async () => {
    const { status } = await Expo.Permissions.getAsync(
      Expo.Permissions.CAMERA_ROLL
    );
    if (status === 'granted') {
      let result = await Expo.ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        this.setState({
          uploadImage: result.uri,
          loading: true,
          profileImage: ''
        });
        const token = await AsyncStorage.getItem('authToken');

        let photo = new FormData();
        const append1 = await photo.append('profilePhoto', {
          uri: result.uri,
          type: 'image/jpeg', // or photo.type
          name: 'testPhotoName'
        });
        const append2 = await photo.append('context', 'profilePhoto');

        fetch(`${this.props.api}/api/upload_profile_photo`, {
          method: 'post',
          body: photo,
          headers: {
            authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.status === 200) {
              this._loadProfilePhoto();
              this._showSuccessMessage('Photo uploaded');
              this.setState({ loading: false });
            } else {
              this._showErrorMessage('Something went wrong.');
              this.setState({ loading: false });
            }
          })
          .catch(err => {
            this._showErrorMessage('Something went wrong.');
            this.setState({ loading: false });
          });
      }
    } else {
      const { ask } = await Expo.Permissions.askAsync(
        Expo.Permissions.CAMERA_ROLL
      );
      const { status2 } = await Expo.Permissions.getAsync(
        Expo.Permissions.CAMERA_ROLL
      );

      if (status2 === 'granted') {
        this._showSuccessMessage('permission granted');
      } else {
        this._showErrorMessage('Not given permission to access photos.');
      }
    }
  };

  _openQr = () => {
    this.props.navigation.navigate('profileQr');
  };
  render() {
    const { UIManager } = NativeModules;
    let { fadeAnim, y } = this.state;
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    return (
      <Container style={{ backgroundColor: '#1FA238' }}>
        <Header transparent>
          <Body>
            <Title style={styles.headerText}>Profile</Title>
          </Body>
        </Header>
        <View>
          {this.state.loading === true ? <Spinner color="white" /> : <View />}
        </View>
        <Animated.View // Special animatable View
          style={{
            ...this.props.style,
            flex: 1,
            opacity: fadeAnim,
            transform: [
              {
                translateY: y
              }
            ] // Bind opacity to animated value
          }}
        >
          <ScrollView>
            <ProfileImage
              name={this.state.name}
              location={this.state.address}
              showBusinessQr={() => this._openQr()}
              primaryButtonTitle="Business Card"
              secondaryButtonTitle="Favourites"
              secondaryIconTitle="heart"
              secondaryButtonPress={() => {
                console.log('my ads');
              }}
              changeProfilePhoto={() => this._changeProfilePhoto()}
              profilePhotoUrl={this.state.profileImage}
            />
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              enabled
            >
              <EditBusinessCard
                name={this.state.name}
                company={this.state.company}
                position={this.state.position}
                email={this.state.email}
                number={this.state.number}
                address={this.state.address}
                onChangeText={(text, input) => this._onChangeText(text, input)}
                saveInfo={this._saveBusinessCard}
                saveLoading={this.state.saveLoading}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </Animated.View>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    api: state.apiRoute
  };
}

export default connect(
  mapStateToProps,
  actions
)(ProfileView);
const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: '#1FA238',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: { backgroundColor: '#318531' },
  headerText: { color: '#fff' },
  nameText: { color: '#fff', fontSize: 20 },
  locationText: { color: '#fff', fontSize: 14 },
  avatar: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4
  }
});
