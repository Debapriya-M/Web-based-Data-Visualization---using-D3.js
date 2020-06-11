# Web-based-Data-Visualization---using-D3.js
D3-based visual interface for countrywide traffic accident dataset collected for the United States  

The dataset used is obtained from Kaggle and is a countrywide traffic accident dataset, collected for the United States from Feb 2016 to Dec 2019.
Used Dataset:
Brief Description of the Columns in the Dataset:
1. ID - This is an identifier of the accident record.
2. TMC - A traffic accident may have a Traffic Message Channel (TMC) code which provides
more detailed description of the event.
3. Severity - Shows the severity of the accident, a number between 1 and 4, where 1
indicates the least impact on traffic (i.e., short delay as a result of the accident) and 4
indicates a significant impact on traffic (i.e., long delay).
4. Side - Shows the relative side of the street (Right/Left) in address field.
5. City - Shows the city in address field.
6. County - Shows the county in address field.
7. Temperature(F) - Shows the temperature (in Fahrenheit).
8. Humidity(%) - Shows the humidity (in percentage).
9. Wind_Direction - Shows wind direction.
10. Weather_Condition - Shows the weather condition (rain, snow, thunderstorm, fog, etc.). 11. Crossing - A POI annotation which indicates presence of crossing in a nearby location.
12. Junction - A POI annotation which indicates presence of junction in a nearby location. 13. Railway - A POI annotation which indicates presence of railway in a nearby location.
14. Station - A POI annotation which indicates presence of station (bus, train, etc.) in a nearby
location.
15. Traffic_Signal - A POI annotation which indicates presence of traffic_signal in a nearby
location.
16. Sunrise_Sunset - Shows the period of day (i.e. day or night) based on sunrise/sunset.
 


Task 1: Present a menu to allow users to select a variable and update chart
Task 2: Draw a bar chart if a categorical variable is selected
Task 3: Draw a histogram if a numerical variable is selected (bin it into a fixed range (equi-width) of your choice)
Task4: Event on mouse-over displaying the value of the bar on top of the bar
Task 5: Event on mouse-over also make the bar wider and higher to focus on it
Task 6: Mouse (with left mouse button down) move left (right) should decrease (increase) bin width/size (for numerical variables only)
