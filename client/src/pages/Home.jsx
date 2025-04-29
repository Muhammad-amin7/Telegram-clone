
import LeftSideBar from '../Components/LeftSideBar';
import { useFindChat } from '../hooks/useGetUsers';

export default function Home() {
  // const [user, setUsers] = useState([])

  const { data } = useFindChat()

  return (
    <div>
      <LeftSideBar sampleChatData={data ? data : []} />
    </div>
  )
}
