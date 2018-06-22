import { Service } from 'moleculer'
import ApiGateway from "moleculer-web"

let service : Partial<Service> = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: http://moleculer.services/docs/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: "/api",
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"*"
			]
			
		}],
		assets: {
			folder: "public"
		}	
	}
};

export default service