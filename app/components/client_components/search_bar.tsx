'use client'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="relative flex-grow">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
                type="text"
                placeholder="Search attractions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
            />
        </div>
    )
}