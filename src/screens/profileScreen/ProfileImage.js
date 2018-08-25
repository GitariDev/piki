import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

export default class ProfileImage extends React.Component {
  render(props) {
    return (
      <View>
        <View style={styles.avatarContainer}>
          <Avatar
            containerStyle={styles.avatar}
            xlarge
            rounded
            source={{
              uri:
                this.props.profilePhotoUrl === ''
                  ? '../img/logo.png'
                  : this.props.profilePhotoUrl
            }}
            onPress={this.props.changeProfilePhoto}
            activeOpacity={0.7}
          />
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.nameText}> {this.props.name}</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.locationText}> {this.props.location}</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.industryText}>
              {this.props.industry ? this.props.industry : ''}
            </Text>
          </View>
          {this.props.trusted >= 0 ? (
            <View style={{ paddingTop: 10 }}>
              <Button
                title={`Trusted by ${this.props.trusted} people`}
                icon={{ name: 'handshake-o', type: 'font-awesome' }}
                backgroundColor="#333"
                onPress={this.props.trustButtonClick}
                outline
              />
            </View>
          ) : (
            <View />
          )}
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <Button
              raised
              rounded
              title={this.props.primaryButtonTitle}
              icon={{ name: 'qrcode', type: 'font-awesome' }}
              backgroundColor="#333"
              onPress={this.props.showBusinessQr}
            />
            <Button
              raised
              rounded
              title={this.props.secondaryButtonTitle}
              icon={{
                name: this.props.secondaryIconTitle,
                type: 'font-awesome'
              }}
              backgroundColor="#02ce98"
              onPress={this.props.secondaryButtonPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
  industryText: { color: '#fff', fontSize: 12 },
  avatar: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4
  }
});
