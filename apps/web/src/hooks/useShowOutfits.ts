import { useEffect, useState } from "react";
import { API_HOST } from "../config/general.config";


export const useShowOutfits = () => {
  const [outfits, setOutfits] = useState([]);

  const getOutfits = async () => {
    try {
      const response: any = await fetch(`${API_HOST}/characters`);
      setOutfits(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOutfits();
  }, []);

  return {
    outfits
  }
}