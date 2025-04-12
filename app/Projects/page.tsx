import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Projects() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center pt-12 pb-4">Projects of mine</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Project 1</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Project 1 description</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project 2</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Project 2 description</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project 3</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Project 3 description</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Project 4</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Project 4 description</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}