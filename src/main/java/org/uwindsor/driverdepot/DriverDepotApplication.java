package org.uwindsor.driverdepot;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.uwindsor.mac.acc.drivedepot.constants.Constants;
import org.uwindsor.mac.acc.drivedepot.htmlparser.impl.HTMLParser;
import org.uwindsor.mac.acc.drivedepot.util.ConfigUtil;
import org.uwindsor.mac.acc.drivedepot.util.IOUtils;

@SpringBootApplication
public class DriverDepotApplication {

	static {
		File propertiesFile;
		try {
			propertiesFile = IOUtils.getFile(HTMLParser.PATH_PROPERTIES_FILE);
			ConfigUtil.loadProperties(propertiesFile, new Properties());
		} catch (IOException e) {
			System.err.println("Error Occurred while loading properties.");
		}
	}
	
	public static void main(String[] args) {
		SpringApplication.run(DriverDepotApplication.class, args);
	}

	 @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return factory -> {
            // Get the port from the environment variable, defaulting to 8080 if not set
            String port = System.getenv("PORT");
            factory.setPort(port != null ? Integer.parseInt(port) : 8080);
        };
    }
}
