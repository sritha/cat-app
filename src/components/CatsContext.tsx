import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getFavourites,
  getMyImages,
  addFavourite,
  removeFavourite,
  upvote,
  downvote,
  getVotes,
  removeCat,
} from "../api/thaCatApi";
import { Cat } from "../models/Cat";

interface ContextProps {
  cats: Cat[] | undefined;
  addFavourite: (id: string) => void;
  removeFavourite: (id: number) => void;
  voteUp: (id: string) => void;
  voteDown: (id: string) => void;
  removeCat: (id: string) => void;
  refreshCats: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const CatsContext = React.createContext({
  cats: [] as Cat[],
  addFavourite: (id: string) => {},
  removeFavourite: (id: number) => {},
  voteUp: (id: string) => {},
  voteDown: (id: string) => {},
  removeCat: (id: string) => {},
  refreshCats: () => {},
  isLoading: false,
  isError: false,
} as ContextProps);

export const CatsContextProvider: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery("getCats", getMyImages);
  const { data: favourites } = useQuery("getFavourites", getFavourites, {
    enabled: !!data,
  });
  const { data: votes } = useQuery("getVotes", getVotes, {
    enabled: !!data,
  });
  const [cats, setCats] = useState<Cat[]>([]);
  // Map favourites and votes to cats
  useEffect(() => {
    if (data) {
      let tempCats = data;
      if (favourites) {
        tempCats = data.map((cat) => {
          const fav = favourites.find((fav) => fav.imageId === cat.id);
          return {
            ...cat,
            catInfo: {
              ...cat.catInfo,
              favorite: fav?.id || null,
            },
          };
        });
      }
      if (votes) {
        tempCats = tempCats.map((cat) => {
          const vote = votes.find((v) => v.imageId === cat.id);
          return {
            ...cat,
            catInfo: {
              ...cat.catInfo,
              votes: vote?.votes || 0,
            },
          };
        });
      }
      setCats(tempCats);
    }
  }, [data, favourites, votes]);

  const _addFavourite = useCallback(
    (id: string) => {
      setCats(
        cats.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                catInfo: {
                  ...cat.catInfo,
                  favorite: 1,
                },
              }
            : cat
        )
      );
      addFavourite(id).then(() => {
        queryClient.invalidateQueries("getFavourites");
      });
    },
    [cats, queryClient]
  );

  const _removeFavourite = useCallback(
    (id: number) => {
      setCats(
        cats.map((cat) =>
          cat.catInfo.favorite === id
            ? { ...cat, catInfo: { ...cat.catInfo, favorite: null } }
            : cat
        )
      );
      removeFavourite(id).then(() => {
        queryClient.invalidateQueries("getFavourites");
      });
    },
    [cats, queryClient]
  );

  const voteUp = useCallback(
    (id: string) => {
      setCats(
        cats.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                catInfo: { ...cat.catInfo, votes: cat.catInfo.votes + 1 },
              }
            : cat
        )
      );
      upvote(id).then(() => {
        queryClient.invalidateQueries("getVotes");
      });
    },
    [cats, queryClient]
  );

  const voteDown = useCallback(
    (id: string) => {
      setCats(
        cats.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                catInfo: { ...cat.catInfo, votes: cat.catInfo.votes - 1 },
              }
            : cat
        )
      );
      downvote(id).then(() => {
        queryClient.invalidateQueries("getVotes");
      });
    },
    [cats, queryClient]
  );

  const _removeCat = useCallback(
    (id: string) => {
      setCats(cats.filter((cat) => cat.id !== id));
      removeCat(id).then(() => {
        queryClient.invalidateQueries("getCats");
      });
    },
    [cats, queryClient]
  );

  const refreshCats = () => {
    queryClient.invalidateQueries("getCats");
  }

  return (
    <CatsContext.Provider
      value={{
        cats: cats,
        addFavourite: _addFavourite,
        removeFavourite: _removeFavourite,
        voteDown,
        voteUp,
        removeCat: _removeCat,
        refreshCats,
        isLoading,
        isError,
      }}
    >
      {children}
    </CatsContext.Provider>
  );
};

export const CatsContextConsumer = CatsContext.Consumer;
