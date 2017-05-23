/*
 *    Licensed Materials - Property of IBM
 *    5725-I43 (C) Copyright IBM Corp. 2015, 2016. All Rights Reserved.
 *    US Government Users Restricted Rights - Use, duplication or
 *    disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package biz.nable.demomfpapp;

import java.io.IOException;
import org.apache.log4j.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;



import biz.nable.demomfpapp.models.Category;
import biz.nable.demomfpapp.models.Company;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;




@Api(value = "Categories Resource")
@Path("/categories")
public class CategoryAdapterResource {
	
	final static Logger logger = Logger.getLogger(CategoryAdapterResource.class);
	
	
	@Context
	ConfigurationAPI configApi;
	
	
	
	
	
	
	
	@GET
	@Path("/")
	@OAuthSecurity(scope = "loginRequired")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get categories list",
    notes = "List of categories via API Connect",
    response = Category.class,
    responseContainer = "List"
    )
	@ApiResponses(value = { @ApiResponse(code = 200, message = "A JSON objects list containing all the categories returned.") })
	public Category[] categories(){
		
		 String clientId = configApi.getPropertyValue("clientId");
		 String baseUrl = configApi.getPropertyValue("baseUrl");
			
		Category categories[] = null;
		
		
		
		OkHttpClient httpclient = new OkHttpClient();
        Request request = new Request.
        		Builder()
        		.addHeader("x-ibm-client-id",clientId)
        		.url(baseUrl+"/categories").get().build();
        Response response;
        
		try {
			response = httpclient.newCall(request).execute();
			ObjectMapper mapper = new ObjectMapper();
	        categories = mapper.readValue(response.body().bytes(), Category[].class);
	        
		} catch (IOException e) {
			
			logger.error(e);
			
		}
		
		return categories;
        
       
		
	}
	
	
	
	@GET
	@Path("{categoryId}/companies")
	@OAuthSecurity(scope = "loginRequired")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get companies by given categoryId",
    notes = "List of companies by given categoryId via API Connect",
    response = Company.class,
    responseContainer = "List"
    )
	@ApiResponses(value = { @ApiResponse(code = 200, message = "A JSON objects list containing all the companies by given categoryId returned.") })
	public Company[] companiesByCategory(@PathParam("categoryId") int categoryId){
			
		 String clientId = configApi.getPropertyValue("clientId");
		 String baseUrl = configApi.getPropertyValue("baseUrl");
		 
		Company companies[] = null;
		
		
		
		OkHttpClient httpclient = new OkHttpClient();
        Request request = new Request.
        		Builder()
        		.addHeader("x-ibm-client-id",clientId)
        		.url(baseUrl+"/companiesincategory/"+categoryId).get().build();
        Response response;
        
		try {
			response = httpclient.newCall(request).execute();
			ObjectMapper mapper = new ObjectMapper();
			companies = mapper.readValue(response.body().bytes(), Company[].class);
			
	        
		} catch (IOException e) {
			
			logger.error(e);
			
		}
		
		return companies;
		
	
		
	}
	
	
	


}
