package <%= gen.package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-starter-eureka-server')) { %>
@EnableEurekaServer
@EnableDiscoveryClient
<% } %>
<% if(has(all.config.tags.build.dependencies, 'artifactId', 'spring-cloud-config-server')) { %>
@EnableConfigServer
<% } %>
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
