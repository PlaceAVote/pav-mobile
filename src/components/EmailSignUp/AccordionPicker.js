      import React, { View, Text } from 'react-native'
      import t from 'tcomb-form-native'
      import Accordion from 'react-native-collapsible/Accordion'
      import moment from 'moment';
      import Button from 'sp-react-native-iconbutton'
      import { Colors } from '../../config/constants';
      const Date = t.form.DatePicker;

      class AccordionPicker extends Date {


        _renderHeader (locals) {

          let curSelectedDate = moment(locals.value).format('MM-DD-YYYY');
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
                     console.log("On button press");
                     locals.config.onCollapsedChange(locals.config.dateBeingPickedNow);
                   }
                 }>
                 {dateBeingPickedNow}
               </Button>
              </View>
            </View>
          )
        }

        _renderContent (locals) {
          // console.log("@@@@@@ DATE IS: "+locals.value)
          return (
            <View>
              {t.form.Form.templates.datepicker({...locals, date: locals.value, mode:'date'}) }
            </View>
          )
        }

        getTemplate () {
          var self = this;

          // let onCollapsedChange = (index)=>{
          //   console.log("On collapse changed: "+index);
          //
          // };
          return function (locals) {
            // console.log("NOWWW@@@@@" +locals.config.dateBeingPickedNow);
            // console.log("locals: "+JSON.stringify(locals));
            return (
              <Accordion
                style={styles.container}
                sections={['Date']}
                renderHeader={self._renderHeader.bind(self, locals)}
                renderContent={self._renderContent.bind(self, locals)}
                collapsed={!locals.config.dateBeingPickedNow}
                underlayColor={Colors.transparentColor}
                onChange={
                  (index)=>{if(index===false){locals.config.onCollapsedChange(true)}else{locals.config.onCollapsedChange(false)}}
                }
              />
            )
          }
        }
      }

      const styles = React.StyleSheet.create({
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
          flex: 1,
          fontSize: 16,
          // backgroundColor: 'red'
        },
        valueContainer:{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        },
        value: {

          // backgroundColor:'red',
          fontSize: 16,
        },
        header: {
          flex: 1,
          height: 44,
          // backgroundColor: '#f9f9f9',
        },
        whiteBtnText:{
          fontFamily: 'Whitney', //Whitney, Whitney Book, Whitney Light, Whitney Semibold, Whitney
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
