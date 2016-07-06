      import React from 'react';
      import {View, Text, StyleSheet} from 'react-native';
      import t from 'tcomb-form-native'
      import Accordion from 'react-native-collapsible/Accordion'
      import Collapsible from 'react-native-collapsible'
      import moment from 'moment';
      import Button from 'sp-react-native-iconbutton'
      import { Colors } from '../../config/constants';
      import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
      import Dimensions from 'Dimensions';
      var {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

      const Date = t.form.DatePicker;

      class AccordionPicker extends Date {



        getTemplate () {
          var self = this;

          // let onCollapsedChange = (index)=>{
          //   console.log("On collapse changed: "+index);
          //
          // };
          return function (locals) {
            // console.log("Platform: "+locals.config.currentOs);
            // console.log("NOWWW@@@@@" +locals.config.dateBeingPickedNow);
            // console.log("locals: "+JSON.stringify(locals));
            // console.log("Current platform: "+locals.config.currentOs);

            return (
                <View style={styles.container}>
                  {t.form.Form.templates.datepicker({...locals, date: locals.value, mode:'date'}) }
                  <Text style={styles.tapToChangeText}>(Tap on date to change)</Text>
                </View>

            );
          }
        }
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginBottom: 10,
          // backgroundColor: '#f9f9f9',
        },
        tapToChangeText: {

          // backgroundColor:'red',
          fontSize: getCorrectFontSizeForScreen(9),
          color: Colors.secondaryTextColor,
        },
      })

      export default AccordionPicker
