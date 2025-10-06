package com;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.exceptions.DuplicateParamException;
import com.exceptions.LoginException;
import com.exceptions.SessionNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {	// validation handler
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex,   																								// i dettagli																							// degli errori
			HttpHeaders headers, 		
			HttpStatusCode status, 		
			WebRequest request) { 		
	
		Map<String, String> errors = new HashMap<>();
	
		ex.getBindingResult().getFieldErrors().forEach(error -> {
			String field = error.getField(); 								
			String message = error.getDefaultMessage(); 					
			errors.put(field, message); 									
		});
		
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("status", status.value()); 								
		body.put("errors", errors); 										
	
		return ResponseEntity.status(status).body(body);
	}
	

	@ExceptionHandler({
		DuplicateParamException.class,
		LoginException.class,
		SessionNotFoundException.class,
		EntityNotFoundException.class,
		RuntimeException.class
	})
	public ResponseEntity<Object> handleCustomException(RuntimeException ex){		// custom exceptions handler
		Map<String, Object> error = new HashMap<String, Object>();
		
		int status = 400;
		
		if(ex instanceof SessionNotFoundException|| 			// not found exceptions
				ex instanceof EntityNotFoundException) {
			status = 404;
		}
		
		else if(ex instanceof DuplicateParamException 			// arguments exceptions
				|| ex instanceof LoginException) {
			status = 401;
		}
		
		else if(ex instanceof RuntimeException) {				// runtime exception
			status = 400;
		}
		
		error.put("status", status);
		error.put("message", ex.getMessage());
		
		return ResponseEntity.status(status).body(error);
	}
}
