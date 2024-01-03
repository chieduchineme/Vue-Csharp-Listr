delimiter ;;
drop procedure if exists SelectUserVaults; ;;
create procedure SelectUserVaults(UserId varchar(255))
begin
	select
		*
	from
		vault a
        left join `user` b on a.user_id = b.user_id
        left join
        (
			select
				vault_id,
                count(*) as vault_keep_count
			from
				map_vault_keep
			group by
				vault_id
        ) c on a.vault_id = c.vault_id
	where
		a.user_id = UserId;
end; ;;
delimiter ;

call SelectUserVaults('7a1295ea-903f-4caf-9fac-b3b667a890f4');