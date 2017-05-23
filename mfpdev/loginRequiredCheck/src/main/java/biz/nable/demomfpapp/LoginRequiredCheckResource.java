/*
 *    Licensed Materials - Property of IBM
 *    5725-I43 (C) Copyright IBM Corp. 2015, 2016. All Rights Reserved.
 *    US Government Users Restricted Rights - Use, duplication or
 *    disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package biz.nable.demomfpapp;

import java.util.HashMap;
import java.util.Map;

import com.ibm.mfp.security.checks.base.UserAuthenticationSecurityCheck;
import com.ibm.mfp.server.registration.external.model.AuthenticatedUser;

public class LoginRequiredCheckResource extends UserAuthenticationSecurityCheck {
	
	private String userId, displayName;
	private String errorMsg;

	@Override
	protected AuthenticatedUser createUser() {
		
		return new AuthenticatedUser(this.getUserId(), this.getDisplayName(), this.getName());
		

	}

	@Override
	protected Map<String, Object> createChallenge() {
		
		Map<String, Object> challenge = new HashMap<String, Object>();
        challenge.put("errorMsg",errorMsg);
        challenge.put("remainingAttempts",getRemainingAttempts());
        return challenge;
        
       
	}

	@Override
	protected boolean validateCredentials(Map<String, Object> credentials) {
		
		if(credentials!=null && credentials.containsKey("username") && credentials.containsKey("password")){
			 
			 String username = credentials.get("username").toString();
			 String password = credentials.get("password").toString();
			 
			 if(username.equals(password)) {
				 
				 this.setUserId(username);
	             this.setDisplayName(username);
	             return true;
			 }else{
				 errorMsg = "Wrong Credentials";
			 }
			 
		 }
		else{
            errorMsg = "Credentials not set properly";
		}
		return false;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	

}
