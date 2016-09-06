defmodule LindaProblemSimple do
  use Xee.ThemeScript
  require Logger

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil
 
  def init do
    {:ok, %{"data" => %{
       page: "waiting",
       participants: %{},
       finish_description: 0,
       text: %{
         descriptions: [
           %{ id: 0, text: "説明1", },
           %{ id: 1, text: "説明2", },
           %{ id: 2, text: "説明3", },
         ],
         question: "リンダは31歳です。独身です。\n社交的でとても陽気な性格です。彼女は哲学を専攻しました。\n学生時代には、差別や社会的正義について深い関心をもち、反原発運動にも参加していました。\n次の各項目の順序を、最もあり得るものを1番目に、最もあり得ないものを8番目に来るように並び替えてください。",
         answers: [
           "プログラマ",
           "銀行員",
           "プログラマで自然保護活動家",
         ],
       },
       joined: 0,
       ans_a: 0,
       ans_b: 0,
       ans_each: 0,
     }}}
  end

  def new_participant(isactive) do
    if isactive do
      %{
        status: nil,
        is_finish_description: false,
      }
    else
      %{
        status: "noactive",
        is_finish_description: false,
      }
    end
  end

  def join(%{participants: participants} = data, id) do
    Logger.debug "Joined"
    unless Map.has_key?(participants, id) do
      participant = if data.page == "experiment" do
        new_participant(false)
      else
        new_participant(true)
      end
      participants = Map.put(participants, id, participant)
      data = %{data | participants: participants}
      unless data.page == "experiment" do
        data = %{data | joined: Map.size(participants)}
      end
      action = %{
        type: "ADD_USER",
        id: id,
        users: participants,
      }
      participant_action = %{
        type: "ADD_USER",
        joined: data.joined,
      }
      {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(participants, participant_action)}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "fetch contents"}) do
    action = Map.merge(%{type: "FETCH_CONTENTS"}, data)
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "change page", "params" => params}) do
    data = %{data | page: params}
    unless data.page == "result" do
      data = Map.put(data, :joined, Map.size(data.participants))
      data = Map.put(data, :ans_a, 0) |> Map.put(:ans_b, 0) |> Map.put(:ans_each, 0)
      participants = Enum.map(data.participants, fn {id, _} ->
        {id, new_participant(true)} end) |> Enum.into(%{})
       data = %{data | participants: participants}
    end
    host_action = %{
      type: "CHANGE_PAGE",
      page: data.page,
      text: data.text,
      users: data.participants,
      ans_a: data.ans_a,
      ans_b: data.ans_b,
      ans_each: data.ans_each,
      joined: data.joined,
    }
    participant_action = Enum.map(data.participants, fn {id, _} ->
      {id, %{action: %{
         type: "CHANGE_PAGE",
         page: data.page,
         text: data.text,
         status: data.participants[id].status,
         ans_a: data.ans_a,
         ans_b: data.ans_b,
         ans_each: data.ans_each,
         joined: data.joined,
       }}} end) |> Enum.into(%{})
     {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant_action}}
  end

  def handle_received(data, %{"action" => "update text", "params" => params}) do
    data = %{data | text: params}
    action = %{
      type: "UPDATE_TEXT",
      text: data.text,
    }
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => dispatch_to_all(data.participants, action)}}
  end

  def handle_received(data, %{"action" => "fetch contents"}, id) do
    action = %{
      type: "FETCH_CONTENTS",
      page: data.page,
      text: data.text,
      status: data.participants[id].status,
      ans_a: data.ans_a,
      ans_b: data.ans_b,
      ans_each: data.ans_each,
      joined: data.joined,
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "submit answer", "params" => params}, id) do
    data = put_in(data.participants[id].status, params)
    data = case params do
      "a" -> Map.put(data, :ans_a, data.ans_a + 1)
      "b" -> Map.put(data, :ans_b, data.ans_b + 1)
      "each" -> Map.put(data, :ans_each, data.ans_each + 1)
      _ -> nil
    end
    host_action = %{
      type: "SUBMIT_ANSWER",
      users: data.participants,
      ans_a: data.ans_a,
      ans_b: data.ans_b,
      ans_each: data.ans_each,
      joined: data.joined,
    }
    participant_action = Enum.map(data.participants, fn {id, _} ->
      {id, %{action: %{
         type: "SUBMIT_ANSWER",
         status: data.participants[id].status,
         ans_a: data.ans_a,
         ans_b: data.ans_b,
         ans_each: data.ans_each,
         joined: data.joined,
       }}} end)
 {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant_action}}
  end

  def handle_received(data, %{"action" => "finish description"}, id) do
    Logger.debug "finish description"
    unless data.participants[id].is_finish_description do
      data = %{data | finish_description: data.finish_description+1}
      data = put_in(data.participants[id].is_finish_description, true)
    end
    action = %{
      type: "FINISH_DESCRIPTION",
      finish_description: data.finish_description,
      users: data.participants,
    }
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, _action, _id) do
    {:ok, %{"data" => data}}
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
