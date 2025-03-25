"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon } from "@/components/ui/icons";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
}

interface MovieRecommendationProps {
  movie: Movie;
}

export function MovieRecommendation({ movie }: MovieRecommendationProps) {
  return (
    <div className="min-w-[200px] w-[200px] overflow-hidden hover:shadow-lg flex flex-col">
      <div className="relative aspect-[1/1] w-full">
        <img
          src={movie.image}
          alt={movie.title}
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="px-2 py-1 text-xs opacity-90">
            {movie.year}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <InfoIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">
                  {movie.title} ({movie.year})
                </h3>
                <p className="text-sm text-muted-foreground">{movie.description}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  <Badge>Action</Badge>
                  <Badge>Sci-Fi</Badge>
                  <Badge>Thriller</Badge>
                </div>
                <div className="pt-2">
                  <Button size="sm" className="w-full">
                    Watch Now
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex p-2">
        <h3 className="font-medium text-sm flex-1">{movie.title}</h3>

        <div className="flex items-center text-sm">
          <Star className="size-[12px] dark:text-yellow-300 text-orange-500 mr-1" />
          3.2
        </div>
      </div>
    </div>
  );
}
