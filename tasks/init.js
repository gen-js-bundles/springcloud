var
  inquirer = require("inquirer"),
  fs = require('fs'),
  path = require('path'),
  gfile = require('gfilesync'),
  yaml = require('js-yaml');

module.exports = {
  do: function(data, callback) {

    var dependenciesChoices = [
      {
        name: "Spring Cloud - Eureka",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-starter-eureka-server",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Config Server",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-config-server",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Turbine",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-starter-turbine",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Turbine AMQP",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-starter-turbine-amqp",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Hystrix Dashboard",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-starter-hystrix-dashboard",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Hystrix",
        value: {
          groupId: "org.springframework.cloud",
          artifactId: "spring-cloud-starter-hystrix",
          isSpringCloud: true
        }
      },
      {
        name: "Spring Cloud - Actuator",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-actuator"
        }
      },
      {
        name: "Web",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-web"
        }
      },
      {
        name: "Security",
        value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-security"
        }
      },
      {
        name: "Test - Spring Boot Test",
	value: {
          groupId: "org.springframework.boot",
          artifactId: "spring-boot-starter-test",
          scope: "test"
        },
        checked: true
      }
    ];

    var questions = [
      {
      	type: 'input',
      	name: 'serverPort',
      	message: 'Which server port ?',
      	default: '8080'
      },
      {
        type: 'list',
        name: 'javaVersion',
        message: 'Which Java version ?',
        choices: [{
          name: '1.8',
          value: '1.8'
        },{
          name: '1.7',
          value: '1.7'
        },{
          name: '1.6',
          value: '1.6'
        },{
          name: '1.5',
          value: '1.5'
        }],
        default: '1.8'
      },
      {
        type: 'list',
        name: 'buildTool',
        message: 'Which build tool ?',
        choices: [{
          name: 'Maven',
          value: 'maven'
        },{
          name: 'Gradle',
          value: 'gradle'
        }],
        default: 'maven'
      },
      {
        type: 'list',
        name: 'packaging',
        message: 'Which packaging ?',
        choices: [{
          name: 'Jar',
          value: 'jar'
        },{
          name: 'War',
          value: 'war'
        }],
        default: 'jar'
      },
      {
        type: 'checkbox',
        name: 'dependenciesSelected',
        message: 'Which dependencies ?',
        choices: dependenciesChoices
      }
    ];
    inquirer.prompt(questions, function( answers ) {
      /*
      if(answers.buildTool == 'maven') {
        gfile.copy(
          path.join(__dirname,'../model/config.@maven.yml'),
          path.join(process.cwd(),'model/config.@maven.yml'));
      }
      if(answers.buildTool == 'gradle') {
        gfile.copy(
          path.join(__dirname,'../model/config.@gradle.yml'),
          path.join(process.cwd(),'model/config.@gradle.yml'));
      }
      */

      var data = gfile.loadYaml(path.join(process.cwd(),'Genjsfile.yml'));

      if(data.global == null) {
        data.global = {};
      }
      if(data.global.project == null) {
        data.global.project = {};
      }
      if(data.global.project.name == null) {
        data.global.project.name = 'myapp';
      }
      if(data.global.project.version == null) {
        data.global.project.version = '0.1';
      }
      if(data.global.project.description == null) {
        data.global.project.description = '';
      }

      if(data.global.maven == null) {
        data.global.maven = {};
      }
      if(data.global.maven.groupId == null) {
        data.global.maven.groupId = 'demo';
      }
      if(data.global.maven.artifactId == null) {
        data.global.maven.artifactId = 'myapp';
      }
      if(data.global.maven.packaging == null) {
        data.global.maven.packaging = answers.packaging;
      }

      if(data.global.version == null) {
        data.global.version = {};
      }
      data.global.version.springboot = '1.2.2';
      if(data.global.version.java == null) {
        data.global.version.java = answers.javaVersion;
      }
      
      var isSpringCloud = false;
      for(var i=0; i<answers.dependenciesSelected.length; i++) {
      	var dependency = answers.dependenciesSelected[i];
      	if(dependency.isSpringCloud) {
      	  isSpringCloud = true
      	}
      }
      if(isSpringCloud) {
        data.global.version.springcloud = '1.0.0.RELEASE';
      }
      
      if(data.global.build == null) {
        data.global.build = {};
      }
      data.global.build.tool = answers.buildTool;
      
      if(data.global.server == null) {
      	data.global.server = {};
      }
      data.global.server.port = answers.serverPort;

      gfile.writeYaml(path.join(process.cwd(),'Genjsfile.yml'), data);

      var data = {
        dependencies: answers.dependenciesSelected
      };

      gfile.writeYaml(path.join(process.cwd(),'model','config.@build.yml'), data);

      if(callback) {
        callback();
      }
    });
  }
};
