delimiter ;;
drop procedure if exists ViewKeep; ;;
create procedure ViewKeep(KeepId int)
begin
	update
		keep
	set
		keep_view_count = keep_view_count + 1
	where
		keep_id = KeepId;
        
	select * from keep where keep_id = KeepId;
end; ;;
delimiter ;