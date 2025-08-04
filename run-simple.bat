@echo off
echo Starting simple Balto Test application...
@echo off
echo Starting simple Balto Test application...

REM First compile
call ./gradlew compileJava

REM Run the simple application
java -cp build/classes/java/main;build/resources/main -Dspring.profiles.active=simple com.baltotest.SimpleApp

echo Application finished.
REM Set environment variable to use minimal configuration
set SPRING_PROFILES_ACTIVE=minimal

REM Run using NoDBMain
java -cp build/classes/java/main com.baltotest.NoDBMain

echo Application finished.
