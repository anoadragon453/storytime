<?php
	
	// get the q parameter from URL
	$input = $_REQUEST["q"];

	$output = "";

	// lookup all hints from array if $q is different from ""
	$command = "/usr/bin/python /var/www/html/storytime/backend/markov.py " . $input;
	$output = exec($command);

	// Output "no suggestion" if no hint was found or output correct values
	echo $output === "" ? "no suggestion." : $output;

?> 
