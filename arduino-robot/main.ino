#include <AFMotor.h>        // for motors
#include <NewPing.h>        // for ultrasonic sensor
#include <SoftwareSerial.h> // for bluetooth pin configuration

#define triggerPin 14      // trigger pin for ultrasonic sensor
#define echoPin 15         // echo pin for ultrasonic sensor
#define maxDistance 200    // max distance sensor can read
#define bluetooth_RX_Pin 0 // pin receives serial data
#define bluetooth_TX_Pin 1 // pin transmits serial data

SoftwareSerial bluetoothSerial(bluetooth_RX_Pin, bluetooth_TX_Pin);

NewPing sonar(triggerPin, echoPin, maxDistance);

AF_DCMotor topl(3); // topleft motor
AF_DCMotor topr(1); // topright motor

void setup()
{
  Serial.begin(9600);          // for printing data to serial monitor
  bluetoothSerial.begin(9600); // for transmitting data with bluetoothSerial object

  topl.setSpeed(255); // setting speeds of four motors
  topr.setSpeed(255);
}

void loop()
{
  if (bluetoothSerial.available())
  {                                   // if data is available for reading from serial port
    char in = bluetoothSerial.read(); // read byte from cellphone and store in "in" variable
    switch (in)
    {
    case 'u': // up
      goForward();
      break;
    case 'd': // down
      goBack();
      break;
    case 'l': // left
      turnLeft();
      break;
    case 'k': // small left
      smallLeft();
      break;
    case 'r': // right
      turnRight();
      break;
    case 'e': // small right
      smallRight();
      break;
    case 's': // stop
      hold();
      break;
    case 'a': // autonomous mode
      autonomous();
    default:
      break;
    }
  }
}

void goForward()
{
  topl.run(FORWARD);
  topr.run(FORWARD);
  Serial.println("Going Forward");
  delay(500);
}

void goBack()
{
  topl.run(BACKWARD);
  topr.run(BACKWARD);
  Serial.println("Going Backwards");
}

void turnLeft()
{
  topr.run(FORWARD);
  topl.run(BACKWARD);
  Serial.println("Turning Left");
}

void turnRight()
{
  topl.run(FORWARD);
  topr.run(BACKWARD);
  Serial.println("Turning Right");
}

void hold()
{
  topr.run(RELEASE);
  topl.run(RELEASE);
  Serial.println("Not Moving");
}

void smallRight()
{
  topl.run(FORWARD);
  topr.run(BACKWARD);
  delay(300);
  topr.run(RELEASE);
  topl.run(RELEASE);
  Serial.println("Small Turn to Right");
}

void smallLeft()
{
  topr.run(FORWARD);
  topl.run(BACKWARD);
  delay(300);
  topr.run(RELEASE);
  topl.run(RELEASE);
  Serial.println("Small Turn to Left");
}

void autonomous()
{ // autonomous mode
  char in = bluetoothSerial.read();

  while (true)
  {
    int objClose = 10;                 // creates variable used for maxdistance robot can be from an object
    char in = bluetoothSerial.read();  // reads character in
    int objDistance = sonar.ping_cm(); // get distance from any object infront

    if (objDistance <= objClose && objDistance != 0)
    {                                                            // if in range of object that is to close (within 10 cm of)
      Serial.println("OBJECT INFRONT OF ME, REDIRECTING ROUTE"); // perform redirection
      hold();
      delay(500);
      goBack();
      delay(300);
      hold();
      delay(500);
      turnRight();
      delay(500);
      hold();
      delay(2000);
      in = bluetoothSerial.read(); // read in character incase we want to quit autonomous mode
    }
    else
    { // if no objects are very close
      goForward();
      in = bluetoothSerial.read(); // read in character incase we want to quit autonomous mode
    }
    
    if (in == 'q')
    {
      hold();
      break;
    }
  }
}
