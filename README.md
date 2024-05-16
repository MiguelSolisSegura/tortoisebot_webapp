## TortoiseBot Web Application

### Overview
This project aims to develop a user-friendly web application to control and monitor the TortoiseBot robot. The web interface allows users to visualize the generated map, view a 3D model of the robot, access the camera feed, use a virtual joystick for manual control, and send the robot to specific waypoints for autonomous navigation. A full visualization can be found [here](https://miguelsolissegura.com/project/tortoisebot-webapp).

### Features
- **Map Visualization:** Real-time display of the environment being mapped by the TortoiseBot.
- **3D Robot Model:** Interactive 3D model of the TortoiseBot for better understanding of its orientation and movements.
- **Camera View:** Live video feed from the robot's onboard camera.
- **Virtual Joystick:** Manual control of the robot using an intuitive virtual joystick.
- **Waypoint Buttons:** Automated navigation to pre-defined waypoints for efficient mapping.

### Prerequisites
- ROS installed on your system.
- Gazebo simulation environment.
- Git for version control.
- Basic web development setup (HTML, CSS, JavaScript).

### Initial Setup
1. **Clone the repository:**
    ```bash
    git clone https://github.com/MiguelSolisSegura/tortoisebot_webapp.git
    cd tortoisebot_webapp
    ```

2. **Set up ROS environment:**
    ```bash
    source ~/simulation_ws/devel/setup.bash
    ```

3. **Launch the TortoiseBot simulation:**
    ```bash
    roslaunch tortoisebot_gazebo tortoisebot_docking.launch
    ```

### Starting the ROSBridge and Video Servers
To enable communication between ROS and the web application:
1. **Launch the ROSBridge and web video server:**
    ```bash
    source ~/simulation_ws/devel/setup.bash
    roslaunch course_web_dev_ros web.launch
    ```

### Running the Mapping System
To start the mapping system for real-time map visualization:
1. **Launch the mapping system:**
    ```bash
    source ~/simulation_ws/devel/setup.bash
    roslaunch tortoisebot_slam mapping.launch
    ```

### Waypoints Action Server
To enable waypoint-based navigation:
1. **Run the waypoints action server:**
    ```bash
    source ~/simulation_ws/devel/setup.bash
    rosrun course_web_dev_ros tortoisebot_action_server.py
    ```

### Launching the Web Application
1. **Navigate to the web application directory:**
    ```bash
    cd ~/webpage_ws/tortoisebot_webapp
    ```

2. **Start the web server:**
    ```bash
    python -m http.server 7000
    ```

3. **Open the web application:**
    Open your web browser and navigate to `http://localhost:7000`.

### Connecting to ROSBridge
1. **Get the ROSBridge server address:**
    ```bash
    rosbridge_address
    ```
    Note the address that is generated.

2. **Enter the ROSBridge address in the web application:**
    In the connection section of the web application, input the ROSBridge address to establish the connection.

### Using the Web Application
- **Map Visualization:** Monitor the real-time map being generated.
- **3D Robot Model:** View and interact with the 3D model of the TortoiseBot.
- **Camera View:** Access the live camera feed from the robot.
- **Virtual Joystick:** Use the joystick to manually control the robot.
- **Waypoint Buttons:** Click on waypoint buttons to send the robot to specific locations.
