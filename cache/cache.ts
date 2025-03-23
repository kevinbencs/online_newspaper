import { unstable_cache } from "next/cache";
import { supabase } from "@/utils/supabase/article";
import Category from "@/model/Category";
import Admin from "@/model/Admin";

export const CatCache = unstable_cache(
    async () => Category.find({},{_id: 1, name: 1}).sort({name: 1}),
    ["catNewNum"],
    {tags: ["catNewNumtag"], revalidate: false}
)

export const AuthCache = unstable_cache(
    async () => Admin.find({},'_id name').sort({name: 1}),
    ["authCacheSearch"],
    {tags: ["authCacheSearchTag"], revalidate: false}
)

export const TitCache = unstable_cache(
    async () => supabase.from('titles').select('id, title, number').order('number', {ascending: false}),
    ["titCacheSearch"],
    {tags: ["titCacheSearchTag"], revalidate: false}
)

export const ThemCache = unstable_cache(
    async () => supabase.from('themes').select('id, theme, number').order('number', {ascending: false}),
    ["themCacheSearch"],
    {tags: ["themCacheSearchTag"], revalidate: false}
)
