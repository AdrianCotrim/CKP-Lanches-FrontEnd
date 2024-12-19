# CKP Lanches

## Screenshots

### Login Screen
![Login Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/img1.PNG?raw=true)

### **User Screens**
These screens are for regular users with limited permissions, featuring functionalities like stock queries and sales registration.

### User Dashboard
![User Dashboard](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/user/img2.jpg?raw=true)

### Orders Screen
![Orders Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/user/img3.PNG?raw=true)

### Deliveries Screen
![Deliveries Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/user/img4.PNG?raw=true)

### Stock Screen
![Stock Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/user/img5.jpg?raw=true)

### Menu Screen
![Menu Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/user/img6.PNG?raw=true)

### **Administrator Screens**
These screens are for administrators with full permissions, including functionalities such as complete stock management, report generation, and financial performance analysis.

### Admin Dashboard
![Admin Dashboard](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img7.jpg?raw=true)

### Orders Screen
![Orders Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img8.PNG?raw=true)

### Deliveries Screen
![Deliveries Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img9.jpg?raw=true)

### Stock Screen
![Stock Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img10.PNG?raw=true)

### Sales History Screen
![Sales History Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img11.PNG?raw=true)

### Menu Screen
![Menu Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img12.PNG?raw=true)

### Manage Users Screen
![Manage Users Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img13.PNG?raw=true)

### Suppliers Screen
![Suppliers Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img14.PNG?raw=true)

### Batches Screen
![Batches Screen](https://github.com/LuisGustavoDev/TCCckpLanches/blob/main/screenshots/admin/img15.PNG?raw=true)


## How to Run the Project

### Prerequisites
- **Java 21** or higher
- **Maven** to build the project
- **MySQL** or another compatible database configured

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/LuisGustavoDev/TCCckpLanches.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd TCCckpLanches
    ```

3. **Create the Database**:
    - Before running the project, you need to create the `ckp_lanches` database in MySQL.
    - Run the following command in MySQL to create the database:
      ```sql
      CREATE DATABASE ckp_lanches;
      ```

4. **Configure the MySQL Database**:
    - Make sure that the database credentials (username and password) in the `application.properties` file are correct.
    - Here are the settings you need to adjust if necessary:

    ```properties
    # Database Settings
    spring.datasource.url=jdbc:mysql://localhost:3306/ckp_lanches?useTimezone=true&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=1234
    ```

5. **Configure the `application.properties`**:
    The `application.properties` file contains project configurations, such as the database, access credentials, and JWT settings. Here are some of the properties you need to ensure are correctly set:

    ```properties
    # Database Settings
    spring.datasource.url=jdbc:mysql://localhost:3306/ckp_lanches?useTimezone=true&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=1234

    # JPA (Hibernate) Settings
    spring.jpa.hibernate.ddl-auto=none  # Defines the database creation behavior
    spring.jpa.show-sql=true  # Displays SQL queries in the console

    # Database Initialization
    spring.datasource.initialization-mode=true
    spring.sql.init.mode=always

    # JWT Security Settings
    my-auth-secret-key=${JWT_SECRET:3dd97dc69115959749508d438d53e9ee}  # Secret key for JWT authentication
    ```

    **Important**: Replace `root` and `1234` with your database username and password. The `JWT_SECRET` key is used for generating JWT tokens and should be kept secret.

6. **Dependencies**:
    The project uses the following essential dependencies:

    - **Spring Boot** (Starter Data JPA, Security, Web)
    - **MySQL Connector**: For connecting to the MySQL database
    - **Lombok**: To reduce boilerplate code
    - **Spring Security**: For authentication and authorization
    - **JWT** (Java JWT): For generating JWT tokens
    - **Spring Boot DevTools**: To facilitate development

    The dependencies are defined in the Maven `pom.xml` file.

### Running the Project

To run the project, execute the following command in the terminal:

```bash
mvn spring-boot:run
```
