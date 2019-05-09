export default class House {
	constructor(entry) {
		this.landlord = entry.landlord ? entry.landlord : "";
		this.cur_tenant = entry.cur_tenant ? entry.cur_tenant : [];
		this.pictures = entry.pictures ? entry.pictures : [""];
		this.availability = entry.availability ? entry.availability : false;
		if (entry.filters_house) {
			this.filters_house = {
				location: entry.filters_house.location ? entry.filters_house.location : "",
				price: entry.filters_house.price ? entry.filters_house.price : 0,
				num_bedroom: entry.filters_house.num_bedroom ? entry.filters_house.num_bedroom : 0,
				num_bathroom: entry.filters_house.num_bathroom ? entry.filters_house.num_bathroom : 0,
				num_parking: entry.filters_house.num_parking ? entry.filters_house.num_parking : 0,
				num_tenant: entry.filters_house.num_tenant ? entry.filters_house.num_tenant : 0,
				additional_tags: entry.filters_house.additional_tags ? entry.filters_house.additional_tags : []
			};
		} else {
			this.filters_house = {
				location: "",
				price: 0,
				num_bedroom: 0,
				num_bathroom: 0,
				num_parking: 0,
				num_tenant: 0,
				additional_tags: []
			};
		}
		
	}
}