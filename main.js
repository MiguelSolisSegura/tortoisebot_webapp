var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        logs: [],
        loading: false,
        rosbridge_address: 'wss://i-04fe93aa691c65139.robotigniteacademy.com/cb7c24e7-26ea-464b-8d39-68222265b7ac/rosbridge/',
        port: '9090',
        // Map properties
        mapViewer: null,
        mapGridClient: null,
        interval: null,
        // 3D properties
        viewer: null,
        tfClient: null,
        urdfClient: null,
    },
    // helper methods to connect to ROS
    methods: {
        connect: function() {
            this.loading = true
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })
            this.ros.on('connection', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
                this.connected = true
                this.loading = false
                this.setup3DViewer()
            })
            this.ros.on('error', (error) => {
                this.logs.unshift((new Date()).toTimeString() + ` - Error: ${error}`)
            })
            this.ros.on('close', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Disconnected!')
                this.connected = false
                this.loading = false
                document.getElementById('map').innerHTML = ''
                this.unset3DViewer()
            })
             this.mapViewer = new ROS2D.Viewer({
                divID: 'map',
                width: 400,
                height: 300
            })

            // Setup the map client.
            this.mapGridClient = new ROS2D.OccupancyGridClient({
                ros: this.ros,
                rootObject: this.mapViewer.scene,
                continuous: true,
            })
            // Scale the canvas to fit to the map
            this.mapGridClient.on('change', () => {
                this.mapViewer.scaleToDimensions(this.mapGridClient.currentGrid.width, this.mapGridClient.currentGrid.height);
                this.mapViewer.shift(this.mapGridClient.currentGrid.pose.position.x, this.mapGridClient.currentGrid.pose.position.y)
            })
        },
        disconnect: function() {
            this.ros.close()
        },
        setup3DViewer() {
            this.viewer = new ROS3D.Viewer({
                background: '#000000',
                divID: 'div3DViewer',
                width: 400,
                height: 300,
                antialias: true,
                fixedFrame: 'odom'
            })

            // Add a grid.
            this.viewer.addObject(new ROS3D.Grid({
                color:'#00ff00',
                cellSize: 0.5,
                num_cells: 20
            }))

            // Setup a client to listen to TFs.
            this.tfClient = new ROSLIB.TFClient({
                ros: this.ros,
                angularThres: 0.01,
                transThres: 0.01,
                rate: 10.0
            })

            // Setup the URDF client.
            this.urdfClient = new ROS3D.UrdfClient({
                ros: this.ros,
                param: 'robot_description',
                tfClient: this.tfClient,
                // We use "path: location.origin + location.pathname"
                // instead of "path: window.location.href" to remove query params,
                // otherwise the assets fail to load
                path: location.origin + location.pathname,
                rootObject: this.viewer.scene,
                loader: ROS3D.COLLADA_LOADER_2
            })
        },
        unset3DViewer() {
            document.getElementById('div3DViewer').innerHTML = ''
        },
    },
    mounted() {
        this.interval = setInterval(() => {
            if (this.ros != null && this.ros.isConnected) {
                this.ros.getNodes((data) => { }, (error) => { })
            }
        }, 10000)
    },
})