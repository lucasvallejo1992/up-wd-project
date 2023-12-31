import { useEffect, useState } from "react"
import { API_HOST } from "../config/general.config";

export const useCreateOutfit = () => {
  const [characters, setCharacters] = useState<any>([]);
  const [shirts, setShirts] = useState<any>([]);
  const [pants, setPants] = useState<any>([]);
  const [shoes, setShoes] = useState<any>([]);

  const getCharacters = async () => {
    try {
      const response: any = await fetch(`${API_HOST}/options/characters`);
      setCharacters(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  const getShirts = async () => {
    try {
      const response: any = await fetch(`${API_HOST}/options/items?type=shirt`);
      setShirts(await response.json());
    } catch (error) {
      console.error(error);
    }
  }
  const getPants = async () => {
    try {
      const response: any = await fetch(`${API_HOST}/options/items?type=pants`);
      setPants(await response.json());
    } catch (error) {
      console.error(error);
    }
  }
  const getShoes = async () => {
    try {
      const response: any = await fetch(`${API_HOST}/options/items?type=shoes`);
      setShoes(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharacters();
    getShirts();
    getPants();
    getShoes();
  }, []);

  const handleSelector = (max: number, number: number, isAdition = true) => {
    if (isAdition) {
      return number === max ? 1 : number + 1;
    }
    return number === 1 ? max : number - 1;
  }

  const handleCreate = async (id: string, items: string[]) => {
    try {
      const token = localStorage.getItem('token') || '';
      const response: any = await fetch(`${API_HOST}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          "id": id
        })
      });
      const itemsResponse: any = await fetch(`${API_HOST}/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({"items": items})
      });
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  return {
    characters,
    shirts,
    pants,
    shoes,
    handleSelector,
    handleCreate
  }
}