import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

function passwordTextbox(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var passwordTextboxStyleContainer = stylesheet.passwordTextboxStyleContainer.normal;
  var passwordTextboxBtn = stylesheet.passwordTextboxBtn;
  var passwordTextboxBtnTxt = stylesheet.passwordTextboxBtnTxt;

  var passwordTextboxStyle = stylesheet.textbox.normal;

  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    passwordTextboxStyleContainer = stylesheet.passwordTextboxStyleContainer.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    passwordTextboxStyle = stylesheet.textbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    passwordTextboxStyle = stylesheet.textbox.notEditable;
    passwordTextboxStyleContainer = stylesheet.passwordTextboxStyleContainer.notEditable;
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;
  return (
    <View style={formGroupStyle}>
      {label}
      <View style={[{flexDirection:'row', justifyContent:'center', borderColor: 'black', borderRadius:2, borderWidth: 1,}, passwordTextboxStyleContainer]}>
        <View style={{flex:1}}>
          <TextInput
            accessibilityLabel={locals.label}
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            blurOnSubmit={locals.blurOnSubmit}
            editable={locals.editable}
            keyboardType={locals.keyboardType}
            maxLength={locals.maxLength}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onLayout={locals.onLayout}
            onSelectionChange={locals.onSelectionChange}
            onSubmitEditing={locals.onSubmitEditing}
            placeholderTextColor={locals.placeholderTextColor}
            secureTextEntry={locals.secureTextEntry}
            selectTextOnFocus={locals.selectTextOnFocus}
            selectionColor={locals.selectionColor}
            numberOfLines={locals.numberOfLines}
            underlineColorAndroid={locals.underlineColorAndroid}
            clearButtonMode={locals.clearButtonMode}
            clearTextOnFocus={locals.clearTextOnFocus}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardAppearance={locals.keyboardAppearance}
            onKeyPress={locals.onKeyPress}
            returnKeyType={locals.returnKeyType}
            selectionState={locals.selectionState}
            onChangeText={(value) => locals.onChange(value)}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            style={[{flex:1},passwordTextboxStyle,{ borderWidth: 0}] }
            value={locals.value}
          />
        </View>

        <TouchableOpacity style={[{justifyContent:'center', paddingHorizontal:5}, passwordTextboxBtn]} onPress={(e)=>{if(!!locals.config.onShowPasswordClicked){locals.config.onShowPasswordClicked(locals.config.passwordHidden)}}}>
          <Text style={passwordTextboxBtnTxt}>{locals.config.passwordHidden===false?"Hide":"Show"}</Text>
        </TouchableOpacity>
      </View>
      {help}
      {error}
    </View>
  );
}

module.exports = passwordTextbox;
