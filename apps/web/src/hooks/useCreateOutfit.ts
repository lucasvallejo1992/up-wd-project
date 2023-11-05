import { useEffect, useState } from "react"

export const useCreateOutfit = () => {
  const [characters, setCharacters] = useState<any>([]);
  const [shirts, setShirts] = useState<any>([]);
  const [pants, setPants] = useState<any>([]);
  const [shoes, setShoes] = useState<any>([]);

  const getCharacters = async () => {
    try {
      const response: any = await fetch('http://127.0.0.1:3001/options/characters');
      setCharacters(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  const getShirts = async () => {
    try {
      const response: any = await fetch('http://127.0.0.1:3001/options/items?type=shirt');
      setShirts(await response.json());
    } catch (error) {
      console.error(error);
    }
  }
  const getPants = async () => {
    try {
      const response: any = await fetch('http://127.0.0.1:3001/options/items?type=pants');
      setPants(await response.json());
    } catch (error) {
      console.error(error);
    }
  }
  const getShoes = async () => {
    try {
      const response: any = await fetch('http://127.0.0.1:3001/options/items?type=shoes');
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
      const response: any = await fetch('http://127.0.0.1:3001/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTkyMjQxNjgsImV4cCI6MTY5OTIzODU2OH0.LDw_COpcpWMqfDlVpFLNrAova90VCfGA40xDSBbzz4E'
        },
        body: JSON.stringify({
          "id": id
        })
      });
      const itemsResponse: any = await fetch(`http://127.0.0.1:3001/characters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTkyMjQxNjgsImV4cCI6MTY5OTIzODU2OH0.LDw_COpcpWMqfDlVpFLNrAova90VCfGA40xDSBbzz4E'
        },
        body: JSON.stringify({"items": items})
      });
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