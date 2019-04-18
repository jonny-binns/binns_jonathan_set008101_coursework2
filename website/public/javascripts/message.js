function encode()
{
    //takes the text from the text box and sets it to input
    //var input = document.getElementById("message").value;
    var input = document.getElementById("plaintext").value;
    //removes any non alphabetical characters
    input = input.replace(/[^a-z]/gi, '');
    //creates three output strings to represent each of the rails
    var output1 = "";
    var output2 = "";
    var output3 = "";
    //creates a final output string
    var output = "";
    try
    {
        //loops through the input string
        for (var i = 0; i < input.length;)
        {
            //for every 4th value, starting from vlaue 0 adds it to the first output string
            output1 = output1 + input.charAt(i);
            i= i + 4;
        }
        for (var i = 1; i< input.length;)
        {
            //for every other value, starting from vlaue 1 adds it to the second output string
            output2 = output2 + input.charAt(i);
            i= i + 2;
        }
        for (var i = 2; i< input.length;)
        {
          //for every 4th value, starting from vlaue 2 adds it to the third output string
          output3 = output3 + input.charAt(i);
          i= i + 4;
        }
        //adds all the output strings together to create the final output string
        output = output1 + output2 + output3;
        //displays the output string in the correct text box
        //document.getElementById("EncipheredTextBox").innerHTML = output;
        document.getElementById("content").value = output;
    }
    //catches any erors
    catch(err)
    {
        //shows any errors as an alert
        alert("Error: " + err);
    }
}

function decode()
{
    //var ciphered = document.getElementById("ciphered").value;
    //document.getElementById("deciphered").value = ciphered;

    //takes the text from the text box and sets it equal to input
    var input = document.getElementById("ciphered").value;
    //removes any non alphabetical characters
    input = input.replace(/[^a-z]/gi, '');
    //calculates the size of the first rail by finding a quater of the input strings length
    //then if theres a remainder rounds up
    var input_length1 = Math.ceil(input.length/4);
    //calculates the size of the second rail by finding a half of the input strings length
    //then if theres a remainder rounds ups
    var input_length2 = Math.floor(input.length/2);
    //calculates the starting character of the third rail by adidng the first and second rails together
    var input_length3 = input_length1 + input_length2;
    //creates input strings for each respective rail
    var input1 = "";
    var input2 = "";
    var input3 = "";
    //creates the output string
    var output = "";
    //loops through the characters in the input string
    for(i=0; i<input.length; i++)
    {
        //calculates the position in the string the first rail ends
        if(i<=input_length1-1)
        {
            //for all the characters in positions equal to the length of the first rail adds them to the first input string
            input1 = input1 + input.charAt(i);
        }
        //calculates the position the second rail starts and finished in the string
        if(i>input_length1-1 && i<=input_length3-1)
        {
            //for the characters in positions bigger than the first rail counts the length of the second rail and adds them to the second input string
            input2 = input2 + input.charAt(i);
        }
        //calculates the starting character of the third rail
        if(i>input_length3-1)
        {
          //adds all the characters after the start of the third rail to the third input string.
          input3 = input3 + input.charAt(i);
        }
    }

    //creates a string for the first rail with added null characters
    var input1_null = "";
    //loops through the input string
    for(i = 0; i<input1.length; i++)
    {
        //if the character at i isnt null it adds three . to the string to keep it in line
        if(input1.charAt(i) != null)
        {
            input1_null += input1.charAt(i) + "...";
        }
    }
    //creates a substring of the correct length from the input1_null string and sets it to input1
    input1 = input1_null.substring(0, input.length);

    //creates a string for the second rail with added null characters
    //adds a . at the start to keep it in line
    var input2_null = ".";
    //loops through the second string
    for(i = 0; i<input2.length; i++)
    {
        //if the character at i isnt null adds a . afterwars
        if(input2.charAt(i) != null)
        {
            input2_null += input2.charAt(i) + ".";
        }
    }
    //creates a substring of the correct legth from the input2_null string and sets it to input2
    input2 = input2_null.substring(0, input.length);

    //creates a string for the third rail with added new characters
    //adds two . to the start to keep it in order
    var input3_null = "..";
    //loops throught the input3 string
    for(i = 0; i<input3.length; i++)
    {
        //if the character at i isnt null adds it to the input3_null string
        if(input3.charAt(i) != null)
        {
            //adds 3 . after every character to keep it in line
            input3_null += input3.charAt(i) + "...";
        }
    }
    //creates a stubstring of the correct length from input3_null and sets it to input3
    input3 = input3_null.substring(0, input.length);

    //creates a counter for the length of the input string
    for(i=0; i<input.length; i++)
    {
      //adds the character at i from each of the input strings to the output string
      output = output + input1.charAt(i) + input2.charAt(i) + input3.charAt(i);
    }
    //removes the null characters
    output = output.replace(/[^0-9a-z]/gi, '');
    //displays text in the output box
    //document.getElementById("DecipheredTextBox").innerHTML = output;
    document.getElementById("deciphered").value = output;
}
