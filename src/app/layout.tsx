import './globals.css'
import type {Metadata} from 'next'
import {ThemeProvider} from "@/components/theme-provider";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
    title: 'O2 Admin',
    description: 'Admin panel built with Next.js and shadcn/ui',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <head/>
            <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SidebarProvider>
                    <AppSidebar/>
                    <main className={` w-full h-[2000px]`}>
                        <SidebarInset className={`z-40  w-full top-0 sticky`}>
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink href="#">
                                                    Building Your Application
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>
                        </SidebarInset>
                        {/*<SidebarTrigger/>*/}
                        {children}
                    </main>
                </SidebarProvider>
            </ThemeProvider>
            </body>
            </html>
        </>
    )
}