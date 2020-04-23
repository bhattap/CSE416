package levelBuilder.com.controller;

import javax.transaction.Transactional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import levelBuilder.com.entities.LayerEntity;
import levelBuilder.com.entities.LayerPropertiesEntity;
import levelBuilder.com.entities.MapEntity;
import levelBuilder.com.repositories.LayerPropertiesRepository;
import levelBuilder.com.repositories.LayerRepository;
import levelBuilder.com.repositories.MapRepository;

@RestController
@RequestMapping("/fileController")
@Transactional
public class FileController {
	
	
	@Autowired
	MapRepository mapRepository;
	
	@Autowired
	LayerRepository layerRepository;
	
	@Autowired
	LayerPropertiesRepository layerPropRepository;
	
	FileController(){
		
	}

	
//	@RequestMapping(value="/save_userName", method=RequestMethod.POST)
//	public ResponseEntity<String> saveUserName(@RequestBody String request) {
//		System.out.println(userName);
//		return new ResponseEntity<>(userName, HttpStatus.CREATED);
//	} 
//	
	@RequestMapping(value="/save_map", method=RequestMethod.POST)
	public ResponseEntity<String> saveMap(@RequestBody MapEntity map) {
		System.out.println(map);
		// save map file
		mapRepository.save(map);
		return new ResponseEntity<>("", HttpStatus.CREATED);
	}
	@RequestMapping(value="/save_layer", method=RequestMethod.POST)
	public ResponseEntity<String> saveLayer(@RequestBody LayerEntity layer) {
		System.out.println(layer);
		// save map file
		layerRepository.save(layer);
		return new ResponseEntity<>("", HttpStatus.CREATED);
	}
	@RequestMapping(value="/save_layerProp", method=RequestMethod.POST)
	public ResponseEntity<String> saveLayerProp(@RequestBody LayerPropertiesEntity layerProp) {
		System.out.println(layerProp);
		// save map file
		layerPropRepository.save(layerProp);
		return new ResponseEntity<>("", HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/load_map", method=RequestMethod.POST)
	public ResponseEntity<String> loadMap(@RequestBody String jsonFileName) {
		JSONObject jsonObject = new JSONObject(jsonFileName); 
		String mapName = jsonObject.getString("mapName");
			System.out.println(mapName);
		MapEntity map = mapRepository.findByName(mapName);
		ObjectMapper mapper = new ObjectMapper();
		String mapJson = "";
		try {
			mapJson = mapper.writeValueAsString(map);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			System.out.println(mapJson);
		// parsing the xml file and return
		return new ResponseEntity<>(mapJson, HttpStatus.CREATED);
	}
	
	
//	@RequestMapping(value="/load_file", method=RequestMethod.POST)
//	public ResponseEntity<String> loadMap(@RequestBody String jsonFileName) {
//		JSONObject jsonObject = new JSONObject(jsonFileName);
//		String fileName = jsonObject.getString("filename");
//		System.out.println(fileName);
//		
//		String xmlString = "<map version=\"1.2\" tiledversion=\"1.3.2\" orientation=\"isometric\" renderoreder=\"left-down\" compressionlevel=\"-1\" width=\"30\" height=\"30\" tilewidth=\"30\" tileheight=\"30\" infinite=\"0\" nextlayerid=\"2\" nextobjectid=\"1\"><layer id=\"1\" name=\"Tile Layer 1\" width=\"30\" height=\"30\"><data encoding=\"csv\">0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0</data></layer></map>";
//		// parsing the xml file and return
//		return new ResponseEntity<>(xmlString, HttpStatus.CREATED);
//	}
}

