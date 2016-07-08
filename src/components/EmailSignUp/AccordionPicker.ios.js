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




        renderHeader (locals) {
          let curSelectedDate = moment(locals.value).format('Do MMMM YYYY');
          let dateBeingPickedNow = locals.config.dateBeingPickedNow?"Done":"Pick";
          return (
            <View style={[styles.header, styles.textContainer]}>
              <Text style={[locals.stylesheet.controlLabel.normal, styles.label]}>
                {locals.label}
              </Text>
              <View style={styles.valueContainer}>
                <Text style={[styles.value]}>
                 {curSelectedDate}
               </Text>
               <Button textStyle={styles.whiteBtnText} style={styles.collapseBtn}
                   onPress={
                     ()=>{
                    //  console.log("On button press");
                     locals.config.onCollapsedChange(locals.config.dateBeingPickedNow);
                   }
                 }>
                 {dateBeingPickedNow}
               </Button>
              </View>

            </View>
          );
        }


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
              <View>
                {self.renderHeader(locals)}
                <Collapsible
                collapsed={!locals.config.dateBeingPickedNow}
                align="center"
                onChange={
                  (index)=>{if(index===false){locals.config.onCollapsedChange(true)}else{locals.config.onCollapsedChange(false)}}
                }
                >
                  <View style={styles.container}>
                    {t.form.Form.templates.datepicker({...locals, date: locals.value, mode:'date', minimumDate:moment([1920, 0, 1]).toDate(), maximumDate: moment().toDate() }) }
                  </View>
                </Collapsible>
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
        textContainer: {
          flexDirection: 'column',
          // paddingLeft: 5,
          // paddingRight: 5,
        },
        label:{
          // flex: 1,
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          fontSize: getCorrectFontSizeForScreen(14),
        },
        valueContainer:{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        },
        value: {
          fontFamily: 'Whitney-Light', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          // backgroundColor:'red',
          fontSize: getCorrectFontSizeForScreen(11),
        },
        header: {
          flex: 1,
          // backgroundColor: '#f9f9f9',
        },
        whiteBtnText:{
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          color: Colors.mainTextColor,
          textAlign: 'center'
        },
        collapseBtn:{
          // position: 'absolute',
          borderRadius: 2,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 1,
          alignSelf: 'center',
          backgroundColor: Colors.primaryColor,

        },
      })

      export default AccordionPicker
