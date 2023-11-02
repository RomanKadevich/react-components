import React from "react";
export type HandlerInputType = (
  event: React.FormEvent<HTMLInputElement>,
) => void;
export type HandlerSubmitType = (
  event: React.FormEvent<HTMLButtonElement>,
) => void;
export type HandlerButtonType = (event: React.MouseEvent<HTMLElement>) => void;
export interface IHeader {
  handleInputSearch: HandlerInputType;
  handleSubmitSearch: HandlerSubmitType;
  value: string;
}

export interface IAnimals {
  page: Page;
  sort: Sort;
  animals: IAnimal[];
}

interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

interface Sort {
  clauses: [];
}

export interface IAnimal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface IPropertyLabels {
  earthAnimal: string | null;
  earthInsect: string | null;
  avian: string | null;
  canine: string | null;
  feline: string | null;
}
