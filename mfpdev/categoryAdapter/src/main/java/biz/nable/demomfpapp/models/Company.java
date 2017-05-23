package biz.nable.demomfpapp.models;

public class Company {
	
	private int id;
	private String utilityDisplayName;
	private String imageFileName;
	private int categoryTypeId;
	private String utilityTrxnCode;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUtilityDisplayName() {
		return utilityDisplayName;
	}
	public void setUtilityDisplayName(String utilityDisplayName) {
		this.utilityDisplayName = utilityDisplayName;
	}
	public String getImageFileName() {
		return imageFileName;
	}
	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}
	public int getCategoryTypeId() {
		return categoryTypeId;
	}
	public void setCategoryTypeId(int categoryTypeId) {
		this.categoryTypeId = categoryTypeId;
	}
	public String getUtilityTrxnCode() {
		return utilityTrxnCode;
	}
	public void setUtilityTrxnCode(String utilityTrxnCode) {
		this.utilityTrxnCode = utilityTrxnCode;
	}
	
	
	
}
