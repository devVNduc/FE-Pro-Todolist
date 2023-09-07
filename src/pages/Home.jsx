import TaskList from '@/components/taskList';

export default function Home(){
    return (
        <section className="lists-container">
                <TaskList title="Danh sách công việc"></TaskList>
                <button className="add-list-btn btn">Add a list</button>
        </section>
    )
}