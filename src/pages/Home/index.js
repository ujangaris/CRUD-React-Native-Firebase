//rncs
import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: {},
      kontaksKey: [],
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Kontak')
      .once('value', quertSnapShot => {
        let data = quertSnapShot.val() ? quertSnapShot.val() : {};
        let kontakItem = {...data};

        this.setState({
          kontaks: kontakItem,
          kontaksKey: Object.keys(kontakItem),
        });
      });
  }

  render() {
    // console.log("Kontkas : ", this.state.kontaks);
    // console.log("Kontkas Key: ", this.state.kontaksKey);
    const {kontaks, kontaksKey} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Kontak</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.listKontak}>
          {kontaksKey.length > 0 ? (
            kontaksKey.map(key => <Text key={key}>{kontaks[key].nama}</Text>)
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>

        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate('TambahKontak')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listKontak: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
