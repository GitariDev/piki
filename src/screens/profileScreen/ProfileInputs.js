import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Input, Item, Label, Card, CardItem } from 'native-base';
import { Button } from 'react-native-elements';

export default class ProfileInputs extends React.Component {
  render() {
    return (
      <Card>
        <CardItem header>
          <Text>Edit your info below:</Text>
        </CardItem>
        <CardItem>
          <Body>
            <View style={styles.contentContainer}>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Name</Text>
                </Label>
                <Input
                  value={this.props.name}
                  onChangeText={text => this.props.onChangeText(text, 'name')}
                />
              </Item>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Company</Text>
                </Label>
                <Input
                  value={this.props.company}
                  onChangeText={text =>
                    this.props.onChangeText(text, 'company')
                  }
                />
              </Item>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Position</Text>
                </Label>
                <Input
                  value={this.props.position}
                  onChangeText={text =>
                    this.props.onChangeText(text, 'position')
                  }
                />
              </Item>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Email</Text>
                </Label>
                <Input
                  value={this.props.email}
                  onChangeText={text => this.props.onChangeText(text, 'email')}
                />
              </Item>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Number</Text>
                </Label>
                <Input
                  value={this.props.number}
                  onChangeText={text => this.props.onChangeText(text, 'number')}
                />
              </Item>
              <Item style={styles.spacing} floatingLabel>
                <Label>
                  <Text>Address</Text>
                </Label>
                <Input
                  value={this.props.address}
                  onChangeText={text =>
                    this.props.onChangeText(text, 'address')
                  }
                />
              </Item>

              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  raised
                  title="Save Info"
                  backgroundColor="#1FA238"
                  onPress={this.props.saveInfo}
                  loading={this.props.saveLoading}
                />
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
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
  avatar: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4
  },
  spacing: {
    marginBottom: 10
  }
});
