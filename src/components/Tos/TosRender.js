/* @flow weak */
/**
 * # TosRender.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict';



// import LinearGradient from 'react-native-linear-gradient';



/*A react native button*/
import Button from 'sp-react-native-iconbutton'


// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import TopicSelectTabBar from '../NewsFeed/TopicSelectTabBar'

import {Colors, ScheneKeys, Other} from '../../config/constants';
const {SOCIAL_TYPES} = Other;
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import {getCorrectFontSizeForScreen} from '../../lib/Utils/multiResolution'
import Dimensions from 'Dimensions';
const {height:h, width:w} = Dimensions.get('window'); // Screen dimensions in current orientation

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from '../../../assets/fonts/icomoon.json';
const PavIcon = createIconSetFromIcoMoon(icomoonConfig);
import PostVoteModalBox from '../Modals/PostVoteModalBox';
// import congratsScreenPhoto from '../../../assets/congratsScreen.png';


import ExpandableText from './ExpandableText';

const styles= StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    // paddingBottom:self.props.isTab===false?0:50, //tab bar height
    paddingTop:(Platform.OS === 'ios' || (Platform.Version > 19) )? 64 : 44,   //nav bar height
    backgroundColor: 'white',
  },
  scroller:{
    flex:1,
  },

});











class TosRender extends React.Component {

  constructor(props){
    super(props);


  }

  /**
   * ### render method
   */
  render() {
    return(
      <View
      style={styles.container}>
        <ScrollView
        style={styles.scroller}
        bounces={false}
        >
          <ExpandableText title="TERMS OF SERVICE & PRIVACY POLICY" value="These Terms of Service are a binding agreement between you and PLACEAVOTE INC, its subsidiaries and affiliated companies (“PAV”) that governs your use of the Application created by PAV. The “Application” means (i) software application, including any services, features and content accessible or downloadable from the Application, and (ii) any other PAV application, service or product licensed, downloaded or otherwise accessed by you through the Application, 3rd party websites or sources."/>
          <ExpandableText title="LIMITED LICENSE GRANT AND RESTRICTIONS" value="PAV grants to you a limited, non-exclusive, non-transferable, non-sublicensable revocable license to use and display the following: (a) the portions of the Application that are freely accessible from the PAV Application, Site or that are, with PAV’s authorization, made freely accessible from third party websites or sources, and (b) such other portions of the Service accessible on a “for-payment” basis, provided that you have paid the applicable fees and satisfied all applicable conditions. The license in the preceding sentence is (i) solely for your personal, noncommercial use; (ii) subject to your compliance at all times with these Terms of Service. You agree not to (and not to attempt to): (i) copy, adapt, modify, prepare derivative works based upon, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast or otherwise exploit the Service or any portion of the Service, except as expressly permitted in these Terms of Service; or (ii) use the Service for any use or purpose other than as expressly permitted by these Terms of Service. Neither PAV nor any of the PAV Parties (as defined below) grant to you any licenses or rights except for the licenses and rights expressly granted in these Terms of Service."/>
          <ExpandableText title="YOUR AGREEMENT TO THESE TERMS OF SERVICE" value="Please carefully read these Terms of Service. By registering for an Account or otherwise using the Application, you represent that (1) you are age 18 or older, (2) you understand and agree to these Terms of Service, and (3) if you are under 18, your legal guardian has reviewed and agrees to these Terms of Service. BY INSTALLING, USING OR OTHERWISE ACCESSING THE SERVICE, YOU AGREE TO THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO THESE TERMS OF SERVICE, PLEASE DO NOT INSTALL, USE OR OTHERWISE ACCESS THE SERVICE. USE OF THE SERVICE IS VOID WHERE PROHIBITED. Except as may be expressly specified otherwise by PAV with respect to paid portions of the Application, PAV reserves the right to add, change, suspend or discontinue the Application, or any aspect or feature of the Application, without notice or liability."/>
          <ExpandableText title="PRIVACY POLICY" value="What Information Do We Collect? User Provided Information - The Application obtains the information you provide when you register the Application. Registration with us is optional. However, please keep in mind that you may not be able to use some of the features offered by the Application unless you register with us. When you register with us and use the Application, you generally provide (a) your name, email address, age, username, password, and other registration information; (b) transaction-related information, such as when you make purchases, respond to any offers, or download or use applications from us; (c) information you provide us when you contact us for help; Automatically Collected Information - In addition, the Application may collect certain information automatically, such as the type of device you use, your devices unique device ID, the IP address of your device, your operating system, the type of Internet browsers you use, and information about the way you use the Application. Do Third Parties See And/Or Have Access To Information Obtained By The Application? We will not share your information with third parties except in the following circumstances: We may disclose Information: When the information has been anonymized or aggregated so that you cannot reasonably be identified as an individual; As required by law, such as to comply with a subpoena, or similar legal process. When we believe in good faith that disclosure is necessary to protect your safety or the safety of others, investigate fraud, or respond to a government request. What Are My Opt-Out Rights? Opt-out of all information collection by closing your account."/>
          <ExpandableText title="USER GENERATED CONTENT" value="User agrees not to generate or share content that (i) breaches any intellectual property rights of any third parties or (ii) constitutes an injury to any person (including defamation, slander, abuse, etc...) or to any third party’s privacy rights or (iii) encourages violence or hatred against any individual or group, or cruelty to animals (iv) or contains sexually explicit or highly suggestive content or (v) encourages drug use or any illegal activity (vii) constitutes a threat to public order or standards of decency and good morals or (viii) violates any applicable laws."/>
          <ExpandableText title="REPORTING OF OBJECTIONABLE USERS OR OBJECTIONABLE CONTENT" value="User can report objectionable users or objectionable content by emailing support@placeavote.com"/>
          <ExpandableText title="REMOVAL OF OBJECTIONABLE USERS OR OBJECTIONABLE CONTENT" value="Within 72 hours of user-report, moderator will remove objectionable users or objectionable content following review."/>
          <ExpandableText title="SECURITY" value="We are concerned about safeguarding the confidentiality of your information. We provide physical, electronic, and procedural safeguards to protect information we process and maintain. For example, we limit access to this information to authorized employees and contractors who need to know that information in order to operate, develop or improve our Application. Please be aware that, although we endeavor to provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches."/>
          <ExpandableText title="CHANGES" value="This Terms of Service may be updated from time to time."/>
          <ExpandableText title="DISCLAIMERS OF WARRANTIES AND DAMAGES, LIMITATIONS OF LIABILITY" value="YOU EXPRESSLY AGREE THAT USE OF THE SERVICE IS AT YOUR SOLE RISK AND IS PROVIDED ON AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. WITHOUT LIMITING THE FOREGOING, NEITHER PAV NOR ITS AFFILIATES OR SUBSIDIARIES, OR ANY OF THEIR DIRECTORS, EMPLOYEES, AGENTS, ATTORNEYS, THIRD-PARTY CONTENT PROVIDERS, DISTRIBUTORS, LICENSEES OR LICENSORS (COLLECTIVELY, “PAV PARTIES”) WARRANT THAT (A) THE SERVICE WILL MEET YOUR REQUIREMENTS OR THE SERVICE MATERIALS OR USER CONTENT WILL BE VIEWABLE TO YOU OR (B) THE SERVICE WILL BE UNINTERRUPTED,TIMELY, SECURE OR ERROR-FREE OR THAT ERRORS WILL BE CORRECTED.UNDER THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE PAV PARTIES SHALL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, PUNITIVE OR OTHER DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUES, LOST PROFITS, LOST DATA OR BUSINESS INTERRUPTION OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING IN ANY WAY TO THESE TERMS OF SERVICE OR THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOTANY PAV PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. UNDER NO CIRCUMSTANCES WILL THE PAV PARTIES BE LIABLE TO YOU FOR MORE THAN THE AMOUNT YOU HAVE PAID TO PAV IN ACCORDANCE WITH THESE TERMS OF SERVICE IN THE NINETY (90) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY SUCH CLAIM. YOU ACKNOWLEDGE AND AGREE THAT IF YOU HAVE NOT PAID PAV ANY SUCH AMOUNTS IN THE NINETY (90) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY SUCH CLAIM, YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH PAV IS TO STOP USING THE SERVICE AND TO CANCEL YOUR ACCOUNT. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain types of damages. Accordingly, some of the above limitations and disclaimers may not apply to you. To the extent that PAV or any other PAV Party may not, as a matter of applicable law, disclaim any warranty or limit its liability as set forth herein, the scope and duration of such warranty and the extent of PAV’ and such PAV Party’s liability shall be the minimum permitted under such applicable law."/>
          <ExpandableText title="INDEMNIFICATION" value="You agree to indemnify, defend and hold PAV Parties harmless from and against any and all claims, liabilities, damages, losses, costs, expenses, fees (including reasonable attorneys’ fees and court costs) due to or arising from (1) information in your Account and any information you (or anyone accessing the Application using your Account) submit, post or transmit through the Application, (2) your (or anyone accessing the Application using your Account) use of the Application, (3) your (or anyone accessing the Application using your Account) violation of these Terms of Service, and (4) your (or anyone accessing the Application using your Account) violation of any rights of any other person or entity. PAV reserves the right, at your expense, to assume the exclusive defense and control of any indemnifiable matter and you agree to cooperate with PAV to defend these claims."/>
          <ExpandableText title="GOVERNING LAW AND REMEDIES" value="These Terms of Service and any action related thereto or to the Application will be governed by the laws of the State of California without regard to its conflict of laws provisions. The exclusive jurisdiction and venue of any action with respect to the subject matter of these Terms of Service will be the state and federal courts located in San Francisco, California, and each of the parties hereto waives any objection to jurisdiction and venue in such courts. The parties specifically disclaim application of the United Nations Convention on Contracts for the International Sale of Goods. You acknowledge that the rights granted and obligations made to PAV under these Terms of Service are of a unique and irreplaceable nature, the loss of which may result in immediate and irreparable harm to PAV for which remedies at law are inadequate. PAV shall therefore be entitled to seek injunctive or other equitable relief (without the obligation to post any bond) in the event of any breach or anticipatory breach by you. You hereby irrevocably waive all rights to seek injunctive or other equitable relief."/>
          <ExpandableText title="YOUR CONSENT" value="By using the Services, you are consenting to our processing of User Provided and Automatically Collection information as set forth in this Terms of Service now and as amended by us. `Processing` means using cookies on a computer/handheld device or using or touching information in any way, including, but not limited to, collecting, storing, deleting, using, combining and disclosing information, all of which activities will take place in the United States. If you reside outside the U.S. your information will be transferred to the U.S., and processed and stored there under U.S. privacy standards. By using the Application and providing information to us, you consent to such transfer to, and processing in, the US."/>
          <ExpandableText title="CONTACT US" value="If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at support@placeavote.com"/>

        </ScrollView>
      </View>
    );
  }
}




TosRender.propTypes= {
};
export default TosRender;
