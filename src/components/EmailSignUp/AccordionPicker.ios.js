      import React from 'react';
      import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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




        renderHeader (locals, controlStyles, containerStyles) {
          let curSelectedDate = moment(locals.value).format('Do MMMM YYYY');
          let dateBeingPickedNow = locals.config.dateBeingPickedNow?"Done":"Change";
          return (
            <View style={[styles.header, styles.textContainer]}>
              <Text style={controlStyles}>
                Birthdate
              </Text>
              <TouchableOpacity style={[styles.valueContainer, containerStyles]} onPress={
                ()=>{
               //  console.log("On button press");
                locals.config.onCollapsedChange(locals.config.dateBeingPickedNow);
              }}>
                <Text style={[styles.value]}>
                 {curSelectedDate}
               </Text>
               <View style={styles.collapseBtn}>
                 <Text style={styles.whiteBtnText} >
                 {dateBeingPickedNow}
                 </Text>
               </View>
              </TouchableOpacity>
              <Text style={[locals.stylesheet.errorBlock]}>
                {locals.error}
              </Text>
            </View>
          );
        }


        getTemplate () {
          var self = this;

          return function (locals) {
            // console.log("NOWWW@@@@@" +locals.config.dateBeingPickedNow);
            // console.log("locals: "+JSON.stringify(locals));
            var stylesheet = locals.stylesheet;
            var controlLabelStyle = stylesheet.controlLabel.normal;
            var datePickerContainerStyle = stylesheet.datePickerContainer.normal;

            if (locals.hasError) {
              controlLabelStyle = stylesheet.controlLabel.error;
              datePickerContainerStyle = stylesheet.datePickerContainer.error;
            }
            return (
              <View>
                {self.renderHeader(locals, controlLabelStyle, datePickerContainerStyle)}
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
          justifyContent:'center'
          // backgroundColor:'purple',
          // paddingLeft: 5,
          // paddingRight: 5,
        },
        label:{
          // flex: 1,
          // backgroundColor:'red',
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          fontSize: getCorrectFontSizeForScreen(14),
        },
        valueContainer:{
          marginTop:2,
          marginBottom:2,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center',
          borderRadius: 4,
          borderWidth: 1,
          paddingLeft:w*.01,
        },

        value: {
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          // color: Colors.fourthTextColor,
          color: Colors.thirdTextColor,
          // backgroundColor:'red',
          fontSize: getCorrectFontSizeForScreen(10),
        },
        tapToChangeText:{
          fontFamily: 'Whitney-Light',
          fontSize:getCorrectFontSizeForScreen(10),
          color: Colors.thirdTextColor
        },
        header: {
          flex: 1,
          // backgroundColor: '#f9f9f9',
        },
        whiteBtnText:{
          fontFamily: 'Whitney-Regular', //Whitney, Whitney-Light, Whitney-Light, Whitney-SemiBold, Whitney
          color: Colors.mainTextColor,
          textAlign: 'center',
          fontSize: getCorrectFontSizeForScreen(12),
        },
        collapseBtn:{
          // position: 'absolute',
          height: 45,
          // width: w*.22,
          justifyContent:'center',
          borderRadius: 2,
          borderWidth: 1,
          paddingHorizontal: w*.05,
          paddingVertical: 1,
          alignSelf: 'center',
          backgroundColor: Colors.primaryColor,

        },
      })

      export default AccordionPicker
