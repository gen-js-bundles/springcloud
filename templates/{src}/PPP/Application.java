package <%= gen.package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-eureka-server')) { %>
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-config-server')) { %>
import org.springframework.cloud.config.server.EnableConfigServer;
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-hystrix-dashboard')) { %>
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
<% } %>

@SpringBootApplication
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-eureka-server')) { %>
@EnableEurekaServer
@EnableDiscoveryClient
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-config-server')) { %>
@EnableConfigServer
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-hystrix-dashboard')) { %>
@EnableHystrixDashboard
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-turbine')) { %>
@EnableTurbine
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-turbine-amqp')) { %>
@EnableTurbineAmqp
<% } %>
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
