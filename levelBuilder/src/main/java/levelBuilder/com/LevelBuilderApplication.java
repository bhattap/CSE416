package levelBuilder.com;

import levelBuilder.com.repositories.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses =  UserRepository.class)
public class LevelBuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(LevelBuilderApplication.class, args);
	}

}
