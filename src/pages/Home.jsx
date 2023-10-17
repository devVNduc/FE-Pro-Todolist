import TaskList from '@/components/taskList';

export default function Home(){
    return (
        <section className="lists-container">
                <TaskList title="Đã xong" topic='done'></TaskList>
                <TaskList title="Chưa hoàn thành" topic='doing'></TaskList>
        </section>
    )
}