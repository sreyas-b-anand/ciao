interface WeatherData {
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
    };
  };
  location: {
    localtime: string;
  };
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}
interface PositionError {
  code: number;
  message: string;
}

import sun from "./images/sun.png";
import { Flex, Image, Text, Box } from "@chakra-ui/react";

import { Suspense, useEffect, useState } from "react";
import Loading from "../loader/Loading";
const WeatherCard = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [data, setData] = useState<WeatherData | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  let latitude: number | null = null;
  let longitude: number | null = null;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        // Success callback
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      },
      (error: PositionError) => {
        // Error callback
        setError(error.message);
      }
    );
  } else {
    setError("Error");
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result: WeatherData = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        //console.error("Fetch Error: ", err.message);
        setData(null);
      }
    };
    fetchData();
  }, [apiKey, latitude, longitude]);
  return (
    <>
      <Flex
        color={"brand.textPrimary"}
        boxShadow={3}
        borderRadius={8}
        p={4}
        fontFamily={"Montserrat"}
        minHeight={"250px"}
        maxHeight={"280px"}
        width={"400px"}
        backgroundColor={"brand.primary"}
        flexDirection={"column"}
        justifyContent={'center'}
      >
        {loading && <Loading />}
        <Suspense fallback={<Loading />}>
          {data && !loading && (
            <>
              <Flex
                direction={"column"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"25px"}>Your Location</Text>
                <Flex direction={"row"} gap={"3"} color={"brand.textSecondary"}>
                  <Text fontSize={"10px"}>{data?.location.localtime}</Text>
                  <Text fontSize={"10px"}>{data?.current.condition.text}</Text>
                </Flex>
              </Flex>
              <Flex width={"100%"} justifyContent={"space-evenly"} pt={3}>
                <Flex
                  direction={"column"}
                  flexWrap={"wrap"}
                  justifyContent={"center"}
                >
                  <Text fontSize={"30px"}>{data?.current.temp_c}'C</Text>
                  <Text fontSize={"12px"} color={"brand.textSecondary"}>
                    feels like {data?.current.feelslike_c}
                  </Text>
                </Flex>
                <Box>
                  <Image src={sun} alt="weather" height="130px" width="130px" />
                </Box>
              </Flex>
            </>
          )}
        </Suspense>
        {error && (
          <>
            <Text
              fontFamily={"Montserrat"}
              textAlign={"center"}
              color={"brand.error"}
            >
              {error}
            </Text>
            <Text
              fontFamily={"Montserrat"}
              textAlign={"center"}
              color={"brand.error"}
            >
              An error has occured while fetching the data
            </Text>
          </>
        )}
      </Flex>
    </>
  );
};

export default WeatherCard;
