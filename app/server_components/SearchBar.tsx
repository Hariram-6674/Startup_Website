import React from "react";
import Form from "next/form";
import ResetButton from "../client_components/ResetButton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = ({query}:{query?:string}) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input name="query" placeholder="Search" defaultValue={query} className="search-input" />
      <div className="flex gap-2">
        {query && <ResetButton /> }
        <Button className="search-btn text-white" type="submit">
          <Search strokeWidth={4} size={60}/>
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
