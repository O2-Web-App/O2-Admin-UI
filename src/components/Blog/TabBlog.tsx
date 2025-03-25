"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableBlogComponent } from "./data-table-blog";
import { DataTableTopBlogComponent } from "../Top10Blog/data-table-topblog";
export default function TabBlog() {
  return (
    <Tabs defaultValue="blog">
      <TabsList className="ml-10">
        <TabsTrigger value="blog">Blog Managment</TabsTrigger>
        <TabsTrigger value="topBlog">Top 10 Blog</TabsTrigger>
      </TabsList>
      <TabsContent value="blog" className="mb-10">
        <DataTableBlogComponent />
      </TabsContent>
      <TabsContent value="topBlog">
        <DataTableTopBlogComponent />
      </TabsContent>
    </Tabs>
  );
}
