import BaseLayout from "@/components/layout/BaseLayout"
import TaskList from '@/components/taskList';

export default function Home(){
    return (
        <BaseLayout>
            <section className="lists-container">
                <TaskList title="Danh sách công việc"></TaskList>
                <button className="add-list-btn btn">Add a list</button>
            </section>
        </BaseLayout>
    )
}