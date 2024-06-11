export const fetchByName = async (param: string, name = '') => {
  const response = await fetch(`https://www.${param}.com/api/json/v1/1/search.php?s=${name}`);
  // if (!response.ok) {
  //   throw new Error ("Erro na requisição")
  // }
  const data = await response.json();
  return data;
};

export const fetchByIngredient = async (param: string, ingredient = '') => {
  const response = await fetch(`https://www.${param}.com/api/json/v1/1/filter.php?i=${ingredient}`);
  // if (!response.ok) {
  //   throw new Error ("Erro na requisição")
  // }
  const data = await response.json();
  return data;
};

export const fetchByFirstLetter = async (param: string, letter: string) => {
  const response = await fetch(`https://www.${param}.com/api/json/v1/1/search.php?f=${letter}`);
  // if (!response.ok) {
  //   throw new Error ("Erro na requisição")
  // }
  const data = await response.json();
  return data;
};

export const fetchByCategory = async (param: string, category: string) => {
  const response = await fetch(`https://www.${param}.com/api/json/v1/1/filter.php?c=${category}`);
  // if (!response.ok) {
  //   throw new Error ("Erro na requisição")
  // }
  const data = await response.json();
  return data;
};

export const fetchDetails = async (param: string, id: string) => {
  const response = await fetch(`https://www.${param}.com/api/json/v1/1/lookup.php?i=${id}`);
  //  if (!response.ok) {
  //   throw new Error ("Erro na requisição");
  // }
  const data = await response.json();
  return data;
};
