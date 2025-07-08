import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function TaskCard({ task, onDelete, onToggle }) {
    return (
        <Card
            className={`relative animation-fade ${task.completed ? "opacity-70" : ""}`}
        >
            <CardHeader>
                <CardTitle className={`text-lg font-semibold ${task.completed ? "line-through text-zinc-400" : ""}`}>
                    {task.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{task.description}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => onToggle(task.id)}>
                    {task.completed ? <CheckCircleIcon className="h-5 w-5" /> : 'Complete'}
                </Button>
                <Button variant="ghost" onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
