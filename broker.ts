import { ServiceBroker } from 'moleculer'

const SERVICE_PATH = process.env.SERVICE_PATH

let broker = new ServiceBroker({
    namespace: process.env.NAMESPACE || '',
    nodeID: null,

    logger:  true,
	logLevel: "info",
	logFormatter: "default",

    transporter: process.env.TRANSPORTER || "NATS",
    
	cacher: "memory",

	serializer: "JSON",

	requestTimeout: 10 * 1000,
	requestRetry: 0,
	maxCallLevel: 100,
	heartbeatInterval: 5,
	heartbeatTimeout: 15,

	disableBalancer: false,

	registry: {
		strategy: "RoundRobin",
		preferLocal: true
	},

	circuitBreaker: {
		enabled: false,
		maxFailures: 3,
		halfOpenTime: 10 * 1000,
		failureOnTimeout: true,
		failureOnReject: true
	},

	validation: true,
	validator: null,
	metrics: false,
	metricsRate: 1,
	statistics: false,
	internalServices: true,

    hotReload: false,

	// Register middlewares
	middlewares: [],

	// Called after broker created.
	created(broker) {
		
	},

	// Called after broker starte.
	started(broker) {

	},

	// Called after broker stopped.
	stopped(broker) {

	}
})


async function start(){
    if(!SERVICE_PATH){
		throw new Error('SERVICE_PATH environment variable has not been set.')
	}

    let service    
    try{
        service = (await import(SERVICE_PATH)).default
    }
    catch(e){
        broker.logger.fatal('Service import failed.')
		throw e
    }

    broker.createService(service)
	broker.start()
}

start()