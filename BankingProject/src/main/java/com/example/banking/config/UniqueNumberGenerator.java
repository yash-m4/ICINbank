package com.example.banking.config;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class UniqueNumberGenerator {

	public static long[] generateUniqueNumber(String baseNumber) {
		// Calculate the maximum possible value for a 10-digit number
		long max10DigitValue = 9999999999L;

		// Calculate the maximum offset to ensure the generated numbers are 10-digit
		// unique numbers
		long maxOffset = max10DigitValue - Integer.parseInt(baseNumber);;

		// Generate a random offset between 1 and maxOffset
		Random random = new Random();
		long offset1 = random.nextLong(Math.abs(maxOffset)) + 1;
		long offset2 = random.nextLong(Math.abs(maxOffset)) + 1;

		// Calculate the unique numbers by adding the base number and offset
		long uniqueNumber1 = Integer.parseInt(baseNumber) + offset1;
		long uniqueNumber2 = Integer.parseInt(baseNumber) + offset2;

		long[] result = { uniqueNumber1, uniqueNumber2 };
		return result;
	}
}
